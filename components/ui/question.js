define(['flight/lib/component'], function(defineComponent)  {

  return defineComponent(question)
  
  function question() {
    this.defaultAttrs({
      qid: undefined,
      min: 1,
      max: 5,
      question: undefined,
      questionType: undefined,
      
      title: 'h4',
      scale: '.scale',
      options: '.options',
      option: '.options .option'
    })
    
    this.labels = {
      'agree': {from: 'I totally disagree', to: 'I totally agree' },
      'helpful': {from: 'Not helpful at all', to: 'Very useful' },
      'difficult': {from: 'Very difficult', to: 'It was easy' }
    }

    this.questionAnswered = function(e, data) {
      if (data.qid == this.attr.qid) {
        this.select('option').removeClass('selected')
        this.select('options').addClass('has-selected')
        this.select('option').filter(function() { 
          return $(this).data('option') == data.answer
        }).addClass('selected')
      }
    }
    
    this.optionClicked = function(e) {
      this.trigger('uiQuestionAnswered', {qid: this.attr.qid, answer: $(e.target).data('option')})
    }

    this.after("initialize", function() {
      this.on(document, 'questionAnswered', this.questionAnswered)
      this.on('click', {
        'option': this.optionClicked
      })
      
      this.$node.append($('<h4>').text('#' + this.attr.qid + ': ' + this.attr.question))
      var scale = $('<div>')
                    .addClass('scale')
                    .addClass('clearfix')
                    .appendTo(this.$node)
      
      scale.append($('<span>')
                    .addClass('label')
                    .addClass('label-warning')
                    .addClass('pull-left')
                    .text(this.labels[this.attr.questionType].from))
                    
      var options = $('<div>')
                    .addClass('options')
                    .appendTo(scale)

      for( var i = this.attr.min; i <= this.attr.max; i++) {
        options.append($('<span>')
                        .addClass('option')
                        .data('option', i)
                        .html('&#9679;'))
      }

      scale.append($('<span>')
                    .addClass('label')
                    .addClass('label-success')
                    .addClass('pull-left')
                    .text(this.labels[this.attr.questionType].to))

      this.trigger('uiQuestionAdded', {qid: this.attr.qid, type: this.attr.questionType, question: this.attr.question})
    })
  }
})