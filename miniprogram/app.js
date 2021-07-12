//app.js
App({
  globalData: {
    openid: '',
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'aecra-bookmark-4gqya2jb3376f9bf',
        traceUser: true,
      })
    }

    wx.cloud.callFunction({
      name: 'login'
    }).then(data => {
      this.globalData.openid = data.result.openid;
    });
  }
})
