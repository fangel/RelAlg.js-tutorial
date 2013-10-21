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
  DEBUG.enable(true)
  DEBUG.events.logAll()
  require(['components/data/questions', 
           'components/ui/progress', 
           'components/ui/question',
           'components/ui/success'],
          function(dataQuestions, uiProgress, uiQuestion, uiSuccess) {
    dataQuestions.attachTo(document)
    uiProgress.attachTo('#progress')
    
    $('.ui-c-question').each(function() {
      uiQuestion.attachTo(this, $(this).data())
    })

    $('.ui-c-success').each(function() {
      uiSuccess.attachTo(this, $(this).data())
    })
  })
})
