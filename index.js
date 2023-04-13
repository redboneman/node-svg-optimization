const fs = require('fs');
const {createSVGWindow} = require('svgdom');
const SVG = require('svgson');

const window = createSVGWindow();
const document = window.document;

const directory = 'icons/solid'

fs.readdir(directory, (err, files) => {
    files.forEach(img => {
        transformIcon(`${directory}/${img}`)
    })
})

function transformIcon(path) {
    fs.readFile(path, 'utf8', async (err, data) => {
        if (err) throw err;

        const svgObject = await SVG.parse(data);

        svgObject.children.forEach(c => {
            if (c.attributes.fill && c.attributes.fill !== 'none') {
                c.attributes.fill = 'currentColor'
            }
            if (c.attributes.stroke && c.attributes.stroke !== 'none') {
                c.attributes.stroke = 'currentColor'
            }
        })
        delete svgObject.attributes.width
        delete svgObject.attributes.height

        const modifiedSvgFileContents = SVG.stringify(svgObject);

        fs.writeFile(path, modifiedSvgFileContents, err => {
            if (err) throw err;
            console.log('SVG file saved!');
        });
    });
}
