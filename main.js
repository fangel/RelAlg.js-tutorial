require.config({
  paths: {
    "bootstrap": "bower_components/bootstrap/dist/js/bootstrap",
    "jquery": "bower_components/jquery/jquery",
    "flight": "bower_components/flight",
  },
  shim: {
    'bootstrap': {
      deps: ['jquery']
    }
  }
});

define(['flight/lib/debug', 'jquery'], function(DEBUG, $) {
  require(['components/data/questions',
           'components/data/persistance',
           'components/ui/progress',
           'components/ui/question',
           'components/ui/success',
           'components/ui/form',
           'components/ui/review'],
          function(
            dataQuestions,
            dataPersistance,
            uiProgress,
            uiQuestion,
            uiSuccess,
            uiForm,
            uiReview) {
    dataQuestions.attachTo(document)
    uiProgress.attachTo('#progress')
    uiForm.attachTo('form')
    uiReview.attachTo('#review')
    
    $('.ui-c-question').each(function() {
      uiQuestion.attachTo(this, $(this).data())
    })

    $('.ui-c-success').each(function() {
      uiSuccess.attachTo(this, $(this).data())
    })
    
    dataPersistance.attachTo(document, {prefix: $('input[name="survey"]').val()})
  })
})
