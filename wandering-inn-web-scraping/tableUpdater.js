const fs = require('fs');
const axios = require('axios').default;
const cheerio = require('cheerio');
let data = { chapters: [] };
async function updateTableOfContents() {
    await axios.get('https://wanderinginn.com/table-of-contents/')
        .then( (html) => {
            const $ = cheerio.load(html.data);
            $('p > a').each((i, elem) => {
                const title = $(elem).text();
                const link = $(elem).attr('href');
                data.chapters.push({ title, link });
            });
            const stringified = JSON.stringify(data, null, 4);
            console.log('Starting Table of Contents file write');
            fs.writeFile('table-of-contents.json', stringified, (err) => err ? console.log('Could not write table of contents') : console.log('Table of Contents written to file.'));
        
        });
}
updateTableOfContents();

module.exports = {
    updateTableOfContents
}

/* Data for dataset
[{word1, count}, {word2, count}, .....]
total words per chapter | total words
chapter date
total comments
number of non-avatar images
*/