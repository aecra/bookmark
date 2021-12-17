// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({ env: 'aecra-bookmark-4gqya2jb3376f9bf' });

// 云函数入口函数
exports.main = async (event) => {
  console.log(event);
  let err = 'unexpected error';
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  await db.collection('config').where({
    _openid: wxContext.OPENID,
  }).update({
    data: {
      config: event.config,
    },
    success: () => {
      err = '';
    },
  });
  return {
    err,
  };
};
