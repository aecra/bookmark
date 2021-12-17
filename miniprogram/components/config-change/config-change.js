// components/config-change/config-change.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
    },
    kind: {
      type: String,
    },
    config: {
      type: Object,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: {
      webdavurl: '修改服务器地址',
      username: '修改账户',
      password: '修改密码',
      path: '修改路径',
    },
    tmpValue: '',
    button: 'button',
  },

  /**
   * 数据监听器
   */
  observers: {
    kind() {
      this.setData({
        tmpValue: this.properties.config[this.properties.kind],
      });
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputCheck(e) {
      const { value } = e.detail;
      if (this.properties.kind === 'webdavurl') {
        const patt = /https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;
        this.setData({
          button: patt.test(value) ? 'button' : 'banbutton',
        });
      } else {
        this.setData({
          button: value.length >= 3 ? 'button' : 'banbutton',
        });
      }
    },
    confirmChange() {
      if (this.data.button === 'banbutton') {
        return;
      }
      const tmpConfig = { ...this.properties.config };
      tmpConfig[this.properties.kind] = this.data.tmpValue;
      wx.cloud.callFunction({
        name: 'updateConfig',
        data: {
          config: tmpConfig,
        },
      }).then((data) => {
        if (data.result.error !== '') {
          wx.event.emit('config', tmpConfig);
          this.setData({
            show: !this.properties.show,
          });
        } else {
          console.log(data.result.error);
        }
      }).catch((e) => {
        console.log('e: ', e);
      });
    },
  },
});
