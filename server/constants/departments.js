const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const csvData = fs.readFileSync(
  path.join(__dirname, '..', 'data', 'sources', 'departments.csv'),
  'utf8'
);

const departments = Papa.parse(csvData, {
  header: true
});

module.exports = departments.data.map(({ name, slug, code }) => ({
  name,
  slug,
  code
}));
