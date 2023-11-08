const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8095', // 代理服务器的地址
            changeOrigin: true,
            pathRewrite: {
                '^/api': 'api', // 重写请求路径，去掉 '/api' 前缀
            },
        })
    )
}
