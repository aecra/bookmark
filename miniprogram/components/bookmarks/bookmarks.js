// components/bookmarks/bookmarks.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: Object,
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
    updatebookmarks(e) {
      this.setData({
        content: e.detail,
      });
    },
  },
});
