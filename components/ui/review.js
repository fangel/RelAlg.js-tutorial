define(['jquery', 'flight/lib/component'], function($, defineComponent)  {

  return defineComponent(review)
  
  function review() {
    var questions = {}

    this.defaultAttrs({
      'tbody': 'tbody',
      'answers': {
        'agree': {
          1: 'I totally disagree',
          2: 'I somewhat disagree',
          3: 'I neither agree nor disagree',
          4: 'I agree',
          5: 'I totally agree'
        },
        'helpful': {
          1: 'Totally unhelpful',
          2: 'Rather unhelpful',
          3: 'Neither helpful nor unhelpful',
          4: 'Rather helpful',
          5: 'Very helpful'
        },
        'difficult': {
          1: 'Very difficult',
          2: 'Somewhat difficult',
          3: 'Neither difficult or easy',
          4: 'Rather easy',
          5: 'It was aasy'
        }
      }
    })
    
    this.questionAdded = function(e, data) {
      console.log(data)
      var row = $('<tr>').appendTo(this.select('tbody'))
      questions[data.qid] = {row: row, type: data.type}
      $('<td>')
        .text('#' + data.qid + ': ' + data.question)
        .appendTo(row)
      $('<td>')
        .html('<em>Unanswered</em>')
        .appendTo(row)
    }
    
    this.questionAnswered = function(e, data) {
      questions[data.qid].row
        .find('td:last-child')
        .text(this.attr.answers[questions[data.qid].type][data.answer])
    }

    this.after("initialize", function() {
      this.on(document, "questionAnswered", this.questionAnswered)
      this.on(document, "questionAdded", this.questionAdded)
    })
  }
})