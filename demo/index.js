const start = require('../index').start;

/**
 * 第一种方法
 * proxy配置走运行目录下的proxy.config.js
 */

// start()

/**
 * 第二种方法
 * proxy配置走 params
 */

// start(params)

start({
  enable: true,
  proxy: {
    rewrite: [{
      rule: /trip\/titan\/([\d\.]*)\/(.*).js/,
      dest: 'https://127.0.0.1:7000/$2.js'
    }, {
      rule: /trip\/titan\/([\d\.]*)\/(.*)\.css/,
      dest: 'https://127.0.0.1:7000/$2.css'
    }]
  }
});
