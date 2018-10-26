// 架构思维 移植性 维护性 稳定性 扩展性
/*
	设计表单校验插件
	require     必须填写
	number      必须是数字
	integer     必须是整数
	length      必须长度是多少
	email       必须是标准的email邮箱格式
	url         必须是合法的url
	regex       必须符合正则表达式匹配的格式

	不是刚需求考虑接口扩展
	mobile      必须是合法的手机号
	cardid      合法的身份证
	bankcard    合法的银行卡
*/

// 自定义属性命名规则: data-插件名字缩写(BV)-属性名
// 不要强奸用户 只要遇到没有把握知道用户喜好的时候，第一给默认值（满足大部分用户）

// 注释用英文


(function(global, factory, plug){
	factory.call(global, global.jQuery, plug)
})(typeof window === 'undefine' ? this: window, function($, plug){
	// 真正被创建的闭包并且只执行一次的内存机构
	// console.log($)
	// console.log(plug)

	var __I18N__ = {
		'en': {
			'notForm': 'It is not form element',
			'errorMsg': '*valid faild'
		},
		// 'zh': {
		// 	'notForm': '非表单元素',
		// 	'errorMsg': '*输入内容不合法'
		// }
	}
	// 默认配置
	var __DEFS__ = {		
		raise: 'change',  //默认change事件
		pre: 'bv-',   //前缀
		errorMsg: null,   // 默认的错误信息
		lang: 'en',  // 配置语言
	}

	// 默认规则引擎
	var __RULES__ = {
		"require": function(){
			// console.log(this.val())
			return this.val() && this.val() != ''
		},
		"number": function(){
			return !isNaN(this.val())
		},
		"integer": function(){
			return true
		},
		"email": function(){
			return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.val())
		},
		"length": function(){
			return this.val().length === Number(this.data(__DEFS__.pre+'length'))
		},
		"regex": function(){
			return new RegExp(this.data(__DEFS__.pre+'regex')).test(this.val())
		}
	}

	$.fn[plug] = function(ops){
		// console.log(this) 
		this.getMessage = $.fn[plug].getMessage;
		var that = $.extend(this, __DEFS__, ops)   // 复制扩展值到this 先扩展默认值，再用用户设置的值覆盖默认值

		if(this.is('form')){		
			var $fields = this.find('input, textarea, select').not('[type=submit], [type=button], [type=reset]')

			$fields.on(this.raise, function(){
				// console.log('changed...')
				var $field = $(this)
				var $group = $field.parents('.form-group:first') // 找到它所在的group元素
				$group.removeClass('has-error has-success')   // 还原样式
				$group.find('.help-block').remove()


				var result = false  // 校验当前元素的结果默认为失败
				var msg;  //错误信息

				// 当前校验元素到底配置了哪些
				$.each(__RULES__, function(rule, active){
					if($field.data(that.pre + rule)){
						// console.log(rule)
						result = active.call($field)
						// console.log(rule + '=>' + result)

						if(!result){
							msg = $field.data(that.pre+rule+'-message') || that.getMessage(that.lang, 'errorMsg')  // 获得配置的错误信息
							$group.addClass('has-error')
							$field.after('<span class="help-block">'+msg+'</span>')
							return false
						}else{
							// 验证成功
							$group.addClass('has-success')
						}
					}
				})
			})

			// console.log($fields)
			this.extendRules = $.fn[plug].extendRules

			return this;
		}else{
			throw new Error(that.getMessage(that.lang, 'notForm'))
		}
	}

	$.fn[plug].extendRules = function(rules){
		$.extend(__RULES__, rules)
	}

	$.fn[plug].addLocal = function(language, data){
		__I18N__[language] = data
	}
	$.fn[plug].getMessage = function(language, key){
		return __I18N__[language][key]
	}
}, 'bootstrapValidator')