const fs = require('fs');
const path = require('path');
const jsdoc2md = require('jsdoc-to-markdown');

/**
 * First of all we need to tell jsdoc2md where to find our source code
 * and we also save a path to where we want to save the resulting docs.
 */
const sourceFiles = path.join(__dirname, '..', 'src', '**', '*.js');
const sourceFilesOutputDir = path.join(__dirname, '..', 'docs', 'api');

/**
 * This is where JSDoc does it's magic and parses the comments out of
 * the source code with all the relevant metadata.
 */
const data = jsdoc2md.getTemplateDataSync({ files: sourceFiles });


const classNames = [];
/**
 * We only choose the docs that we want. Here we filter only for docs that
 * represent a Class.
 *
 * We're using .forEach because we will be adding stuff to the callback later on.
 */
data.forEach((identifier) => {
    if (identifier.kind === 'class') classNames.push(identifier.name);
});

/**
 * Finally, we write each class to a separate markdown file, using a jsdoc2md template.
 * More on templates later on.
 */
classNames.forEach((className) => {
    const template = `{{#class name="${className}"}}{{>docs}}{{/class}}`;

    console.log(`Rendering ${className}, template: ${template}`);
    const output = jsdoc2md.renderSync({ template, data });
    // Append a header to the generated docs.
    const markdown = getHeader(className) + output;
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
