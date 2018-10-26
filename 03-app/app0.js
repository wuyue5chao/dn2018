const url = require('url')
const http = require('http')
const https = require('https')

// 创建一个HTTP服务器
const server = http.createServer((req, res) => {
	// 监听函数 请求处理函数 自动添加到request事件
	// req(http.request) 请求对象
	// res(http.response) 响应对象
	http.get('http://www.baidu.com', (resq)=>{
		// 这个callback 就是请求之后的回调函数
		// res http.ClientResponse的一个实例对象

		
		let data = ''
		// data 数据到达事件
		resq.on('data', chunk => {  // chunk 表示接收到的数据
			data += chunk
		})
		// end 传输结束事件
		resq.on('end', () => {
			// 设置http标头 告诉浏览器怎么显示数据 -->返回源码
			// res.writeHeader(200, {'Content-Type': 'application/json; charset=utf-8'})
			res.end(data)
		})	
	})


}).listen(3000, '127.0.0.1')

console.log('服务器已启动')