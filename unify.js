const csvParser = require('csvtojson');
const fs = require('fs');
const fileNames = [
    'Calculators and Sci calculators',
    'Canvases and sketchpads',
    'Clips Pins rubberbands',
    'Craft kits',
    'erasers sharpners rulers pencil',
    'Glues, Adhesive and dispenser',
    'Markers highlighters and correctors',
    'Pen stands and document trays',
    'Pens and refills',
    'scissors and cutters',
    'Sketch pen crayons color pencil',
    'Stamp pads and inks',
    'Staplers removers and punchs'
];
const fields = [
    'id',
    'brand',
    'name',
    'category_id',
    'image_l',
    'image_s',
    'description',
    'price'
];

const jsonToCsv = require('json2csv').Parser;
const json2csvParser = new jsonToCsv({ fields });
//prob-get list of all users
//we get in batches of 100-suppose we have 300
async function getEntireProductList() {
    let products = [];
    for (const fileName of fileNames) {
        let result = await csvParser().fromFile(fileName + '.csv');
        result.forEach(item => item.price = null);
        products = products.concat(result);
    }
    return products;
}

getEntireProductList()
    .then(products => {
        const csv = json2csvParser.parse(products);
        fs.writeFile('Products.csv', csv, 'utf8', err => {
            if (err) {
                throw err;
            }
            console.log('Conversion successful');
        });
    });