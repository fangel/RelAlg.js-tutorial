define(['flight/lib/component'], function(defineComponent)  {

  return defineComponent(persistance)
  
  function persistance() {
    var id, answers, store = window.localStorage
    
    this.defaultAttrs({
      prefix: null
    })
    
    this.questionAnswered = function(e, data) {
      answers[data.qid] = data.answer
      store.setItem(this.attr.prefix + "_answers", JSON.stringify(answers))
    }
    
    this.after("initialize", function() {
      // Ensure that we have a unique ID
      if (!(id = store.getItem(this.attr.prefix + "_id")))
        store.setItem(this.attr.prefix + "_id", id = Math.random().toString(36).substring(2))

      // Ensure we have a _answers key in localStorage
      var _answers
      if (!(_answers = store.getItem(this.attr.prefix + "_answers")))
        store.setItem(this.attr.prefix + "_answers", _answers = "{}")

      // Load in the answers we found, and say that the user answered a question
      answers = JSON.parse(_answers)
      for (var qid in answers) {
        this.trigger("questionAnswered", {qid: qid, answer: answers[qid]})
      }

      this.trigger("persistanceId", {id: id})

      // And then listen for any further answers, so we can make them persist
      this.on("questionAnswered", this.questionAnswered)
    })
  }
})