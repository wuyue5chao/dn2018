;(function(global, factory, plug){
	factory.call(global, global.jQuery, plug)
})(window, function($, plug){
	var __TEMP__ = `
		<div class="dn-guide">
			<h2 class="title">#TITILE</h2>
			<div class="toolbar">
				<button class="pre">pre</button>
				<button class="next">next</button>
				<button class="finish">finish</button>
			</div>
		</div>
	`
	// 默认值
	var __OPS__ = {
		title: '',
		step: 1
	}
	// 允许用户配置的参数
	var __props__ = ['title', 'step']

	var __PROTO__ = {
		init: function(){
			var ops = {}
			var _that = this
			$.each(__props__, function(idx, val){
				ops[val] = _that.data('jg-' + val)
			})
			// console.log(ops)
			return ops
		},
		render: function(){
			this._P = this.addClass('content').parent()
			this._C = $(__TEMP__.replace('#TITILE', this.title)) 
			$('.title', this._C).after(this)
			this._P.append(this._C)
			
			this._BS = this._P.find('.toolbar').children('button')
			this._max = this.children().length
			console.log(this._BS)
			this.setStep(this.step)
			this.listener()
		},
		listener: function(){
			var _that = this
			this._BS.filter('.pre').on('click', function(){
				_that.setStep(--_that.step)
				_that.onStep()
			})
			this._BS.filter('.next').on('click', function(){
				_that.setStep(++_that.step)
				_that.onStep()
			})
			this._BS.filter('.finish').on('click', function(){
				_that.finished()
			})
		},
		setStep: function(step){
			this.children().eq(step-1).addClass('curr-step').siblings().removeClass('curr-step')
			switch(step){
				case 1: 
					this._BS.filter('.pre').hide()
					this._BS.filter('.next').show()
					this._BS.filter('.finish').hide()
					break;
				case this._max: 
					this._BS.filter('.pre').show()
					this._BS.filter('.next').hide()
					this._BS.filter('.finish').show()
					break;
				default: 
					this._BS.filter('.pre').show()
					this._BS.filter('.next').show()
					this._BS.filter('.finish').hide()
					break;
			}
		}
	}

	$.fn[plug] = function(options){
		$.extend(this, __OPS__, options, __PROTO__.init.call(this), __PROTO__)
		this.render()
	}
}, 'guide')