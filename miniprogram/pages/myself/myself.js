// miniprogram/pages/myself/myself.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    config: {
      webdavurl: '',
      username: '',
      password: '',
      path: '',
    },
    configShow: false,
    configKind: 'webdavurl',
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
    wx.event.on('config', (data) => {
      this.setData({
        config: data,
      });
    });
  },

  raiseConfig(e) {
    const { kind } = e.target.dataset;
    this.setData({
      configShow: true,
      configKind: kind,
    });
  },
});
