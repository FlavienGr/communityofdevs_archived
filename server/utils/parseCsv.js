const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const parseCsvFile = file => {
  const csvData = fs.readFileSync(
    path.join(__dirname, '..', 'data', 'sources', file),
    'utf8'
  );
  return Papa.parse(csvData, {
    header: true
  });
};

module.exports = parseCsvFile;
