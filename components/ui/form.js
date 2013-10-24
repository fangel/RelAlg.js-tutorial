define(['jquery', 'flight/lib/component'], function($, defineComponent)  {

  return defineComponent(form)
  
  function form() {
    this.defaultAttrs({
      'submit': 'input[type="submit"]',
      'id': 'input[name="id"]',
      'survey': 'input[name="survey"]',
      'answers': 'input[name="answers"]'
    })
    
    this.questionAnswered = function(e, data) {
      var answers = JSON.parse(this.select('answers').val())
      answers[data.qid] = data.answer
      this.select('answers').val(JSON.stringify(answers))
    }
    
    this.persistanceId = function(e, data) {
      this.select('id').val(data.id)
    }
    
    this.requestSubmit = function(e, data) {
      var values = this.$node.serializeArray()
      this.trigger('uiSubmitRequested', values)

      this.$node.find('.alert.alert-success').remove();
      this.select('submit').attr('disabled', 'disabled').val('Please Wait')
      var endpoint = this.$node.attr('action')
      $.post(endpoint, values, function(response, status) {
        this.select('submit').attr('disabled', null).val('Re-submit Answers')
        this.$node.append($('<div>')
                            .addClass('alert')
                            .addClass('alert-success')
                            .addClass('success')
                            .html('<strong>Success!</strong> Your anwsers have been saved. Thank you!')
                         )        
      }.bind(this))

      e.preventDefault()
    }
    
    this.after("initialize", function() {
      this.on(document, "questionAnswered", this.questionAnswered)
      this.on(document, "persistanceId", this.persistanceId)
      this.on('click', {
        'submit': this.requestSubmit
      })
    })
  }
})