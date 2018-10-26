// 引入express框架
let express = require('express')  
let app = express()

// 引入跨域中间件  用来连接 快速和浏览器同步
let proxy = require('http-proxy-middleware')
// 跨域模块
let cors = require('cors')

app.use(cors())
app.use('/', proxy({
	target: 'http:baidu.com',
	changeOrigin: true,  // 允许跨域
}))

app.listen(3000)
console.log('服务器已启动')