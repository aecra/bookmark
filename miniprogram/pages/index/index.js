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

  ab2str(input, outputEncoding = 'utf8') {
    const decoder = new TextDecoder(outputEncoding);
    return decoder.decode(input);
  },

  getXbel() {
    wx.cloud.callFunction({
      name: 'getfile',
      data: {
        webdavurl: this.data.config.webdavurl,
        username: this.data.config.username,
        password: this.data.config.password,
        path: this.data.config.path,
        type: 'file',
      },
    }).then((data) => {
      wx.cloud.callFunction({
        name: 'convert-bookmark',
        data: {
          xbel: this.ab2str(data.result.buff),
        },
      }).then((bookmark) => {
        this.setData({
          xbel: bookmark.result.bookmark.xbel,
        });
      });
    });
  },
});
