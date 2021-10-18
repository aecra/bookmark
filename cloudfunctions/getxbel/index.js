const {
  createClient,
} = require('webdav');
const util = require('util');
const xml2js = require('xml2js');

exports.main = async (event) => {
  const client = createClient(
    event.webdavurl, {
      username: event.username,
      password: event.password,
    },
  );
  const result = await client.getFileContents(event.path).then((buff) => {
    // 将文件内容从二进制转换成字符串
    const decoder = new util.TextDecoder();
    const xmldata = decoder.decode(buff);
    // 解析文件内容
    const parser = new xml2js.Parser();
    return parser.parseStringPromise(xmldata);
  }).then((bookmark) => ({
    xbel: bookmark.xbel,
  })).catch((e) => {
    if (e.message === 'Invalid response: 401 Unauthorized') {
      return Error('配置信息错误！');
    }
    return Error('文件解析错误！');
  });
  if (result instanceof Error) {
    return {
      error: result.message,
    };
  }
  return result;
};
