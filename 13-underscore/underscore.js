/*
 * @Author:
 * @Date:
 * 模块化开发
 */
(function(root, factory){
	(typeof module === 'object' && module.exports) ? module.exports = factory() : root._ = root.Underscore = factory()
})(this, function(){
	var _ = function(){
		// console.log(this)
		if(!(this instanceof _)){
			return new _()
		}
	}

	_.uniq = function(){
		console.log('uniq')
	}

	// 获取对象的所有属性名
	_.functions = function(obj){
		var result = []
		for(var key in obj){
			result.push(key)
		}
		console.log(result)
		return result
	}

	_.each = function(arr, callback){
		for(var i=0; i<arr.length; i++){
			callback.call(arr[i], i, arr[i])
		}
	}

	// 将所有方法扩展到原型
	_.mixin = function(obj){
		_.each(_.functions(obj), function(i, key){
			var func = obj[key]
			obj.prototype[key] = function(){
				func()
			}
		})
	}

	_.mixin(_)
	return _
})