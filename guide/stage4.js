/**
 * This is the stage3.js file with comments removed
 * and only the new features commented.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const jsdoc2md = require('jsdoc-to-markdown');

/**
 * We introduced some async functionality, so we wrap everything
 * to use await.
 */
async function main() {
    const sourceFiles = path.join(__dirname, '..', 'src', '**', '*.js');
    const sourceFilesOutputDir = path.join(__dirname, '..', 'docs', 'api');

    /**
     * Let's just use the index.js as an example file.
     */
    const exampleFiles = path.join(__dirname, '..', 'index.js');
    const exampleFilesOutputDir = path.join(__dirname, '..', 'docs', 'examples');

    const data = jsdoc2md.getTemplateDataSync({ files: sourceFiles });
    /**
     * Read the example data.
     */
    const exampleData = jsdoc2md.getTemplateDataSync({ files: exampleFiles });

    const classNames = data.reduce((classNames, identifier) => {
        if (identifier.kind === 'class') classNames.push(identifier.name);
        return classNames;
    }, []);

    classNames.forEach((className) => {
        const template = `{{#class name="${className}"}}{{>docs}}{{/class}}`;

        console.log(`Rendering ${className}, template: ${template}`);
        const output = jsdoc2md.renderSync(getRenderOptions(template, data));

        const markdown = generateFinalMarkdown(className, output, classNames);

        // Write docs to the destination set at the top.
        fs.writeFileSync(path.resolve(sourceFilesOutputDir, `${className}.md`), markdown);
    });

    /**
     * We need to do some manual rendering of the example files,
     * but nothing too difficult. We use the `lineno` parameter
     * of the JSDoc data to figure out where the description ends
     * and the source code starts. Then we just read the file
     * from that line down using the Node.js Readline API.
     */
    const examplePromises = exampleData.map(async (example) => {
        const { description, meta: { filename, path: filepath, lineno } } = example;
        const code = await readFileFromLine(path.join(filepath, filename), lineno);
        const sep = '```';
        const codeblock = `${sep}javascript\n${code}\n${sep}`;

        const title = filename.split('.')[0].split('_').map(word => `${word[0].toUpperCase()}${word.substr(1)}`).join(' ');
        const header = getHeader(title);
        const markdown = `${header}\n${description}\n${codeblock}`;
        fs.writeFileSync(path.join(exampleFilesOutputDir, `${title.replace(/\s/g, '')}.md`), markdown);
    });

    await Promise.all(examplePromises);
}

main();

/**
 * HELPER FUNCTIONS
 */

/**
 * Generates a Docusaurus compliant header.
 * @param {String} title
 * @returns {String}
 */
function getHeader(title) {
    const id = title.replace(/\s/g, '-').toLowerCase();
    return `---\nid: ${id}\ntitle: ${title}\n---\n`;
}

/**
 * Takes a jsdoc-to-markdown output and tweaks it
 * with various replacements to suit our needs.
 *
 * It could be faster and more optimized,
 * but that's not what we really need right now.
 * @param title
 * @param text
 * @param classNames
 * @returns {string}
 */
function generateFinalMarkdown(title, text, classNames) {
    const header = getHeader(title);
    // Remove Class titles so we don't have double page titles with Docusaurus.
    const rx = new RegExp(`# \`?${title}\`?.*?\n`);
    text = text.replace(rx, '');
    // Remove 'Kind' annotations.
    text = text.replace(/\*\*Kind\*\*.*\n/g, '');
    // Fix class links
    const linksRx = new RegExp(`([("])#(module_)?(${classNames.join('|')})([)"])`, 'gi');
    text = text.replace(linksRx, (match, p1, p2, p3, p4) => p1 + p3.toLowerCase() + p4);

    return header + text;
}

/**
 * jsdoc-to-markdown supports a wide variety of options to configure
 * the output it generates.
 *
 * You can find the full documentation at
 * https://github.com/jsdoc2md/jsdoc-to-markdown/blob/master/docs/API.md
 * @param template
 * @param data
 * @returns {Object}
 */
function getRenderOptions(template, data) {
    return {
        template, // This is just the template we created earlier.
        data, // The raw data created by .getTemplateDataSync()
        'name-format': true, // Uses <code> or `` to format names of classes, functions ...
        'param-list-format': 'table', // Use a table to format parameters instead of a simple bullet point index.
        'heading-depth': 1, // Set the heading level of the top heading (that we delete anyway, but we need the subheadings to start at lvl 2)
        helper: [path.join(__dirname, 'tools', 'helpers.js')], // Attaches a file with helper functions that override jsdoc generation.
        partial: [
            path.join(__dirname, 'tools', 'params-table.hbs'), // Overrides internal template to generate parameter tables.
        ],
    }
}



/**
 * This is just an async wrapper around Node.js Readline API.
 * We need to read the lines to split the example files into
 * description and source code.
 * @param path
 * @param lineNumber jsdoc-to-markdown gives us this number
 * @returns {Promise}
 */
async function readFileFromLine(path, lineNumber = 1) {
    return new Promise((resolve, reject) => {
        const output = [];
        const rl = readline.createInterface({
            input: fs.createReadStream(path),
            crlfDelay: Infinity,
        });
        let lineCounter = 0;
        rl.on('line', (line) => {
            lineCounter++;
            if (lineCounter >= lineNumber) output.push(line);
        });
        rl.on('close', () => resolve(output.join('\n')));
        rl.on('error', err => reject(err));
    });
};
