define(['flight/lib/component'], function(defineComponent)  {

  return defineComponent(success)
  
  function success() {
    this.defaultAttrs({
      qid: undefined
    })
    
    this.questionAnswered = function(e, data) {
      if (this.attr.qid == data.qid)
        this.$node.show()
    }

    this.after("initialize", function() {
      this.on(document, "uiQuestionAnswered", this.questionAnswered)
      this.$node.hide()
    })
  }
})