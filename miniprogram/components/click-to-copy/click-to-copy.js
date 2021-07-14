// components/click-to-copy/click-to-copy.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: String,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    copyToClipboard() {
      wx.setClipboardData({
        data: this.properties.data,
      });
    },
  },
});
