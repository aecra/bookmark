// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    config: {
      webdavurl: '',
      username: '',
      password: '',
      path: '',
    },
    xbel: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.initData();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  initData() {
    const app = getApp();
    this.setData({
      openid: app.globalData.openid,
      config: app.globalData.config,
    });
    if (this.data.config.webdavurl === '') {
      setTimeout(() => { this.initData(); }, 200);
    } else {
      this.getXbel();
    }
  },

  getXbel() {
    wx.cloud.callFunction({
      name: 'getxbel',
      data: {
        webdavurl: this.data.config.webdavurl,
        username: this.data.config.username,
        password: this.data.config.password,
        path: this.data.config.path,
      },
    }).then((data) => {
      this.setData({
        xbel: data.result.xbel,
      });
    }).catch((e) => {
      console.log('e: ', e);
    });
  },
});
