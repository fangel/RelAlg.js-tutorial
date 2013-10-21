define(['flight/lib/component'], function(defineComponent)  {

  return defineComponent(questions)
  
  function questions() {
    this.defaultAttrs({})
    
    this.questionAdded = function(e, data) {
      this.trigger("questionAdded", {qid: data.qid})
    }
    
    this.questionAnswered = function(e, data) {
      this.trigger("questionAnswered", {qid: data.qid, answer: data.answer})
    }
    
    this.after("initialize", function() {
      this.on("uiQuestionAdded", this.questionAdded)
      this.on("uiQuestionAnswered", this.questionAnswered)
    })
  }
})