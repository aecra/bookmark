const xml2js = require('xml2js');

exports.main = async (event) => {
  const parser = new xml2js.Parser();
  const bookmark = await parser.parseStringPromise(event.xbel);
  console.log(bookmark);
  return { bookmark };
};
