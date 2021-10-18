const { createClient } = require('webdav');
const util = require('util');
const xml2js = require('xml2js');
const { to } = require('await-to-js');

exports.main = async (event) => {
  const client = createClient(
    event.webdavurl, {
      username: event.username,
      password: event.password,
    },
  );
  // 获取文件内容
  const [err1, buff] = await to(client.getFileContents(event.path));
  if (err1) return { error: '配置信息错误！' };
  // 将文件内容从二进制转换成字符串
  const decoder = new util.TextDecoder();
  const xmldata = decoder.decode(buff);
  // 解析文件内容
  const parser = new xml2js.Parser();
  const [err2, bookmark] = await to(parser.parseStringPromise(xmldata));
  if (err2) return { error: '文件解析错误！' };
  return { xbel: bookmark.xbel };
};
