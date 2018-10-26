$.fn.bootstrapValidator.extendRule({
  'cardId': function(){
    return /(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(this.val())
  },
  mobile: function(){
    
  }
})