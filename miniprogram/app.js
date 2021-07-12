// app.js
App({
  globalData: {
    openid: '',
    hasConfig: false,
    config: {
      webdavurl: '',
      username: '',
      password: '',
      path: '',
    },
  },
  onLaunch() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'aecra-bookmark-4gqya2jb3376f9bf',
        traceUser: true,
      });
    }

    wx.cloud.callFunction({
      name: 'login',
    }).then((data) => {
      this.globalData.openid = data.result.openid;
      this.getConfig();
    });
  },
  getConfig() {
    const db = wx.cloud.database();
    db.collection('config').where({
      _openid: this.globalData.openid,
    }).get({
      success: (res) => {
        if (res.data.length !== 0) {
          this.globalData.hasConfig = true;
          this.globalData.config = res.data[0].config;
        }
      },
    });
  },
  setConfig(config) {
    this.globalData.hasConfig = true;
    this.globalData.config = config;
    const db = wx.cloud.database();
    db.collection('config').add({
      data: {
        config: this.globalData.config,
      },
    });
  },
  updateConfig(config) {
    this.globalData.config = config;
    const db = wx.cloud.database();
    db.collection('config').where({
      _openid: this.globalData.openid,
    }).update({
      data: {
        config: this.globalData.config,
      },
    });
  },
});
