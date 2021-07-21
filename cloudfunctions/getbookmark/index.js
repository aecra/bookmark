const { createClient } = require('webdav');
const { DOMParser } = require('xmldom');

function ab2str(input, outputEncoding = 'utf8') {
  const decoder = new TextDecoder(outputEncoding);
  return decoder.decode(input);
}

const client = createClient(
  'https://dav.jianguoyun.com/dav/',
  {
    username: '2572607031@qq.com',
    password: 'aic6w4agctcxnwm7',
  },
);

exports.main = async (event) => {
  const buff = await client.getFileContents(event.path);
  const bookmarkstring = ab2str(buff);
  const bookmark = new DOMParser().parseFromString(bookmarkstring);
  return { bookmark };
};
