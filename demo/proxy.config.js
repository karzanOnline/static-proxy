module.exports = {
  proxy: {
    rewrite: [{
      rule: /trip\/titan\/([\d\.]*)\/(.*).js/,
      dest: 'https://127.0.0.1:7000/$2.js'
    }, {
      rule: /trip\/titan\/([\d\.]*)\/(.*)\.css/,
      dest: 'https://127.0.0.1:7000/$2.css'
    }]
  }
};
