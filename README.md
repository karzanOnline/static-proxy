## Static-Proxy

> 前端静态资源代理

## 说明

底层基于 anyproxy，专注于解决前端开发和调试中资源代理

## 使用场景

在线本地调试（日常，预发，线上）

## 安装

```
$ tnpm i awesome-static-proxy
```

## 使用

在根目录建`proxy.config.js`文件

## 参数配置
根据rule的正则来匹配对应的静态资源代理到对应的dest

```
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
```

## 运行

```
$ proxy start
```

## 安装证书

执行命令生成证书

```
$ proxy cert
```

生成证书后需要手动去信任证书，详情参考 anyproxy 官网

## changelog

### 1.2.1

* 对外暴露 disable 方法, umi-plugin-proxy 使用

### 1.0.0

* 第一版发布
  * 仅支持 https 的静态资源代理
  * 添加 https 证书功能
