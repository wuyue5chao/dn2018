/*
* 模块加载器
*/

(function(root){
	// 记录模块的信息：依赖 接口对象 名称 状态
	var ModMap = {

	}

	// 初始化 启动模块加载器
	function seaUse(deps, callback){
		var depsLen = deps.length
		var params = []

		if(depsLen === 0) callback()
		for(var i=0; i<depsLen; i++){
			
			(function(j){
				// console.log(deps[j])
				loadMod(deps[j], function(param){
					console.log(param)
					depsLen--
					params[j] = param
					console.log(depsLen)
					if(depsLen === 0){
						callback.apply(null, params)
					}
				})
			})(i)
		}
	}

	// 缓存处理 路径处理 匿名模块的处理
	// 打包工具 webpack --> big.js
	function loadMod(name, callback){
		if(!ModMap[name]){
			ModMap[name] = {
				status: 'loading'
			}

			loadScript(name, function(){
				seaUse(ModMap[name].deps, function(){
					// 执行当前被加载的模块
					execMode(name, callback)
				})
			})
		}
	}

	// script 注入
	function loadScript(name, callback){
		var doc = document
		var node = doc.createElement('script')
		node.src = name + '.js'
		doc.body.appendChild(node)
		node.onload = function(){
			callback()
		}
	}

	function define(name, deps, callback){
		ModMap[name] = ModMap[name] || {}
		ModMap[name].deps = []
		ModMap[name].callback = callback
	}

	function execMode(name, callback){
		var exp = ModMap[name].callback()   // 接口对象
		ModMap[name].exports = exp
		callback(exp)
	}

	root.define = define
	root.seaUse = seaUse
})(this)