/**
 * DMD is a package used internally by jsdoc-to-markdown
 * that contains all the logic and templates that render
 * the final output.
 *
 * See it here: https://github.com/jsdoc2md/dmd
 *
 * It doesn't have any reasonable docs though,
 * so you just have to go through the files and
 * try to figure it out on your own.
 *
 * The key takeout is that the file you include in your
 * jsdoc2md.renderSync({
 *     helpers: PATH <----
 * })
 * needs to export functions that replace internal helpers,
 * so they need to be named the same. You can find all
 * the helpers by going through DMD source code.
 */

const ddata = require('dmd/helpers/ddata');


/**
 * This helper function override fixes link URLs to match
 * Docusaurus case-sensitive routes and also makes sure that the links
 * are correctly displayed as <code>.
 */
exports.inlineLinks = (text, options) => {
    if (text) {
        const links = ddata.parseLink(text);
        links.forEach((link) => {
            const linked = ddata._link(link.url, options);
            if (link.caption === link.url) link.caption = linked.name;
            if (linked.url) link.url = linked.url;
            const url = link.url.includes('+') ? link.url : link.url.toLowerCase();
            text = text.replace(link.original, `[\`${link.caption}\`](${url})`);
        });
    }
    return text;
};
