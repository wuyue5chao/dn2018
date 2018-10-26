/*
* @Author:
* @Date:
* @Last Modified by: 
* @Last Modified time: 
* lodash 工具库
*/

(function(global, factory){
	typeof exports === 'object' && typeof module !== 'undefine' ? module.exports : 1
	typeof define === 'function' && define.amd ? define(factory) : (global._ = global.lodash = factory())
})(this, function(){
	var _ = function(){
		if(!(this instanceof _)){
			return new _()  // 1、创建object对象 2、调用构造函数
		}
	}
	_.uniq = function(arr, isSort, callback){
		console.log(111)
	}
	// _.prototype.uniq = function(){
	// 	console.log(222)
	// }

	_.each = function(arr,callback){
		console.log(arr)
		for(var i=0; i<arr.length; i++){
			callback(arr[i], i)
		}
	}
	_.functions = function(obj){
		var res = []
		for(var key in obj){
			res.push(key)
		}
		return res
	}

	// mixin  对象 遍历_对象的 属性方法
	_.mixin = function(obj){
		_.each(_.functions(obj), function(key){
			var func = obj[key]
			obj.prototype[key] = function(){
				// console.log(222)
				func.call(this)
			}
		})
	}

	_.mixin(_)
	return _;
})

//