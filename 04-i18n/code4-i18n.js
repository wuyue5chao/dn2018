// ; 作用

;(function(global, factory){
	factory.call(global)
})(this, function(){
	// 语言缓存池
	var __lang__ = {

	}
	
	var __g__ = this['i18n'] = this['I18N'] = {
		init: function(language, values){
			__lang__[language] = values
			console.log(__lang__)
		},
		lang: function(lang){
			i18n.lang = lang
			return i18n
		},
		msg: function(language, key){
			return (__lang__[language] && __lang__[language][key]) || '空字符串'
		},
		getValsByLang: function(language){
			return __lang__[language]
		},
		clearLang: function(language){
			delete __lang__[language]
		}
	}
	var i18n = {
		// 代码冗余 
		
		/*msg: function(key){
			return (__lang__[this.lang] && __lang__[this.lang][key]) || '空字符串'
		}*/
		msg: function(key){
			return __g__.msg(this.lang,key)
		},
		getVals: function(){
			return __g__.getValsByLang(this.lang)
		},
		clear: function(){
			__g__.clearLang(this.lang)
		}
	}
})