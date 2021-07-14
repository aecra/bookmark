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
      const app = getApp();
      const tmpConfig = { ...this.properties.config };
      tmpConfig[this.properties.kind] = this.data.tmpValue;
      app.updateConfig(tmpConfig).then(() => {
        this.setData({
          show: !this.properties.show,
          config: tmpConfig,
        });
        // 注意！
        // 此条语句解决的问题是config-change组件中修改了config
        // 而myself页面中组件config-box使用的是config.属性
        // 上一条语句的修改并不能使的组件config-box的数据动态修改
        // 所以添加此条语句，用于重新加载页面数据
        // 解决方法可能需要研究双向数据绑定和组件间传递数据的实现原理
        // eslint-disable-next-line no-undef
        getCurrentPages()[0].initData();
      });
    },
  },
});
