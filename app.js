const csvParser = require('csvtojson');
const fs = require('fs');
const fields = ['Handle', 'Title', 'Body (HTML)', 'Vendor', 'Type', 'Tags', 'Published',
    'Option1 Name', 'Option1 Value', 'Option2 Name', 'Option2 Value', 'Option3 Name', 'Option3 Value',
    'Variant SKU', 'Variant Grams', 'Variant Inventory Tracker', 'Variant Inventory Qty', 'Variant Inventory Policy',
    'Variant Fulfillment Service', 'Variant Price', 'Variant Compare At Price', 'Variant Requires Shipping',
    'Variant Taxable', 'Variant Barcode', 'Image Src', 'Image Position', 'Image Alt Text', 'Gift Card', 'SEO Title',
    'SEO Description', 'Google Shopping / Google Product Category', 'Google Shopping / Gender', 'Google Shopping / Age Group',
    'Google Shopping / MPN', 'Google Shopping / AdWords Grouping', 'Google Shopping / AdWords Labels',
    'Google Shopping / Condition', 'Google Shopping / Custom Product', 'Google Shopping / Custom Label 0',
    'Google Shopping / Custom Label 1', 'Google Shopping / Custom Label 2', 'Google Shopping / Custom Label 3',
    'Google Shopping / Custom Label 4', 'Variant Image', 'Variant Weight Unit', 'Variant Tax Code'];

const jsonToCsv = require('json2csv').Parser;
const json2csvParser = new jsonToCsv({ fields });

csvParser().fromFile('Calculators and Sci calculators.csv')
    .then(result => {
        //convert json into required format
        const transformedResult = transformResult(result);
        const csv = json2csvParser.parse(transformedResult);

        fs.writeFile('converted-products-export.csv', csv, 'utf8', err => {
            if (err) {
                throw err;
            }
            console.log('Conversion successful');
        });
    });

/**
 * @param {Array} result
 * @returns {Array}
 */
function transformResult(result) {
    return result.map(value => {
        let transformedValue = [];
        transformedValue['Title'] = value.name;
        transformedValue['Body (HTML)'] = value.description;
        let substrings = value.name.split(' ');
        substrings.forEach((element, index, list) => {
            list[index] = element.toLowerCase();
        });
        transformedValue['Handle'] = substrings.join('-');
        transformedValue['Vendor'] = 'hellostore@123';
        transformedValue['Variant Inventory Tracker'] = 'shopify';
        transformedValue['Variant Inventory Qty'] = 10;
        transformedValue['Variant Inventory Policy'] = 'deny';
        transformedValue['Variant Fulfillment Service'] = 'manual';
        transformedValue['Variant Price'] = value.price;
        transformedValue['Variant Requires Shipping'] = true;
        transformedValue['Variant Taxable'] = false;
        transformedValue['Image Src'] = 'https://cdn.shopify.com/s/files/1/0031/3661/8594/products/91_L.jpg?v=1534872542';//todo
        transformedValue['Image Position'] = 1;
        transformedValue['Gift Card'] = false;
        transformedValue['Type'] = '';//todo
        transformedValue['Tags'] = '';//todo

        return transformedValue;
    });
};