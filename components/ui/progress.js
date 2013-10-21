define(['flight/lib/component'], function(defineComponent)  {

  return defineComponent(progress)
  
  function progress() {
    var total = 0
      , status = 0
      , _seen = {}

    this.defaultAttrs({
      'status': 'span:first-child',
      'total': 'span:last-child'
    })
    
    this.questionAdded = function(e, data) {
      this.select('total').text(++total)
    }
    
    this.questionAnswered = function(e, data) {
      if (_seen[data.qid]) return
      _seen[data.qid] = true
      this.select('status').text(++status)
    }
    
    this.after("initialize", function() {
      this.on(document, "questionAdded", this.questionAdded)
      this.on(document, "questionAnswered", this.questionAnswered)
    })
  }
})