// components/folder/folder.js
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
    updatebookmarks() {
      const bookmarks = {};
      if (this.properties.content.bookmark !== undefined) {
        bookmarks.bookmark = this.properties.content.bookmark;
      }
      if (this.properties.content.folder !== undefined) {
        bookmarks.folder = this.properties.content.folder;
      }
      this.triggerEvent('updatebookmarks', bookmarks, {});
    },
  },
});
