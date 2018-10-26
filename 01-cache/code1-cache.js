var DnCache = (function(global,factory){
	return factory.call(global)
})(this,function(){
	// 闭包 缓存的管理对象
	// 缓存池 在内存中的数据 数据的形态就是object, redis ehcache oscache
	var __POOL__ = {
		// 'cacheA': {
		// 	max: 5,  // 最多被缓存5个对象
		// 	auto: true,  // true说明缓存的策略是用一个缓存一个，false指一次性缓存max
		// 	objs: []  // 缓存对象 length最多为5个
		// },
		// 'cacheB': {
		// 	max: 15,  // 最多被缓存5个对象
		// 	auto: false,  // true说明缓存的策略是用一个缓存一个，false指一次性缓存max  是否懒加载
		// 	objs: []  // 缓存对象 length最多为15个
		// }
	}
	// 缓存框架
	var __CACHE__ = {
		// 新增一个缓存对象
		add: function(key, temp, max, auto){
			var _c_ = {
				max: max,    // 最大数量
				_idx: 0,    //当前数量
				auto: auto,
				temp: temp,    // 模板对象
				objs: []
			}
			
			if(!_c_.auto){
				for(var i=0; i<max; i++){
					var _clone = temp.cloneNode(true) 
					_clone.dataset.id = i
					_c_.objs.push(_clone) 
				}
			}
			__POOL__[key] = _c_
			return _c_
		},
		// 获得一个缓存对象
		get: function(key){
			var _c = __POOL__[key]
			return _c.objs[_c._idx]
		},
		// 清除一个缓存对象
		clear: function(key){
			delete __POOL__[key]
		}
	}
	__CACHE__._p = __POOL__

	return __CACHE__
})

DnCache.add('A', document.createElement('li'),6, false)
console.log(DnCache._p)
console.log(DnCache.get('A'))
console.log(DnCache.get('A'))
console.log(DnCache.get('A'))