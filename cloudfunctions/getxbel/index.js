const { createClient } = require('webdav');
const util = require('util');
const xml2js = require('xml2js');

exports.main = async (event) => {
  const client = createClient(
    event.webdavurl,
    {
      username: event.username,
      password: event.password,
    },
  );
  // 获取文件内容
  const buff = await client.getFileContents(event.path);
  // 将文件内容从二进制转换成字符串
  const decoder = new util.TextDecoder();
  const xmldata = decoder.decode(buff);
  // 解析文件内容
  const parser = new xml2js.Parser();
  const bookmark = await parser.parseStringPromise(xmldata);
  return { xbel: bookmark.xbel };
};
