const parseCsvFile = require('../utils/parseCsv');
const { sanitizedData } = require('../utils/sanitizedData');

const csvData = parseCsvFile('cities.csv');
const csvData2 = parseCsvFile('cities2.csv');
const csvData3 = parseCsvFile('cities3.csv');

const setCitiesOne = sanitizedData(csvData);
const setCitiesTwo = sanitizedData(csvData2);
const setCitiesThree = sanitizedData(csvData3);

module.exports = {
  setCitiesOne,
  setCitiesTwo,
  setCitiesThree
};
