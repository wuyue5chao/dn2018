(function(){
	var html = `<div class="layer">
					<h2>提示</h2>
					<p>{text}</p>
					<button>知道了</button>
				</div>`

	// 组件的构造函数
	function Layer(text){
		this.text = text
		this.init()
	}

	// 定义初始化弹窗的方法
	/*Layer.prototype.init = function(){
		// 初始化弹窗的DOM结构
		this.initDom()
		// 初始化弹窗事件 按钮事件
		this.initEvent()
	}*/

	Layer.prototype = {
		init: function(){
			// 初始化弹窗的DOM结构
			this.initDom()
			// 初始化弹窗事件 按钮事件
			this.initEvent()
		},
		initDom: function(){
			// 为什么要创建一个div？ 把html字符串 转化成 dom元素
			var node = document.createElement('div')
			node.innerHTML = html.replace('{text}', this.text)
			// console.log(node.innerHTML)

			// 获取DOM对象
			this.dom = node.childNodes[0]
			console.log(this.dom)
		},
		initEvent: function(){
			// var that = this
			// this.dom.onclick = function(){
			// 	that.hide()
			// }

			this.dom.addEventListener('click', function(evt){
				if(evt.target.tagName === 'BUTTON'){
					this.hide()
				}
			}.bind(this), false)

			// bind 强制绑定弹窗组件来调用回调函数
			// 创建一个新函数 把对象传入 this -> Layer
		},
		show: function(){
			// 将创建的节点添加到页面的body中
			document.body.appendChild(this.dom)
		},
		hide: function(){
			document.body.removeChild(this.dom)
		}

	}

	window.Layer = Layer  // 把Layer对象赋值给全局 外面可以访问
})()