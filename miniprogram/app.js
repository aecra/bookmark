// app.js
import Event from 'utils/event';

wx.event = new Event();

App({
  globalData: {
    openid: '',
    config: {
      webdavurl: '',
      username: '',
      password: '',
      path: '',
    },
    defaultConfig: {
      webdavurl: 'https://example.com/dav/',
      username: 'username',
      password: 'password',
      path: 'path/bookmarks.xbel',
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
          this.globalData.config = res.data[0].config;
          wx.event.emit('config', this.globalData.config);
        } else {
          // 数据库中无数据、设置数据的默认值
          this.globalData.config = this.globalData.defaultConfig;
          this.setConfig(this.globalData.defaultConfig);
        }
      },
    });
  },
  setConfig(config) {
    this.globalData.config = config;
    const db = wx.cloud.database();
    db.collection('config').add({
      data: {
        config: this.globalData.config,
      },
    });
  },
  updateConfig(config) {
    // 返回 Promise，记录状态改变信息
    return new Promise((resolved) => {
      this.globalData.config = config;
      const db = wx.cloud.database();
      db.collection('config').where({
        _openid: this.globalData.openid,
      }).update({
        data: {
          config: this.globalData.config,
        },
        success: (res) => {
          resolved(res);
        },
      });
    });
  },
});
