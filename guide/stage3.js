/**
 * This is the stage2.js file with comments removed
 * and only the new features commented.
 */

const fs = require('fs');
const path = require('path');
const jsdoc2md = require('jsdoc-to-markdown');

const sourceFiles = path.join(__dirname, '..', 'src', '**', '*.js');
const sourceFilesOutputDir = path.join(__dirname, '..', 'docs', 'api');

const data = jsdoc2md.getTemplateDataSync({ files: sourceFiles });


const classNames = [];
data.forEach((identifier) => {
    if (identifier.kind === 'class') classNames.push(identifier.name);
});

classNames.forEach((className) => {
    const template = `{{#class name="${className}"}}{{>docs}}{{/class}}`;

    console.log(`Rendering ${className}, template: ${template}`);

    /**
     * Add more options to the rendering process to fine-tune the
     * output generation.
     */
    const output = jsdoc2md.renderSync(getRenderOptions(template, data));

    /**
     * Replace the simple title + jsdoc-to-markdown output concatenation
     * with a function that takes care of all the tweaks we need.
     */
    const markdown = generateFinalMarkdown(className, output);

    // Write docs to the destination set at the top.
    fs.writeFileSync(path.resolve(sourceFilesOutputDir, `${className}.md`), markdown);
});

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
 * @returns {string}
 */
function generateFinalMarkdown(title, text) {
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
