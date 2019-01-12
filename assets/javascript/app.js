$(document).ready(function () {

  $("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click', '.option', trivia.guessChecker);

})

var trivia = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId: '',

  questions: {
    q1: 'Which bird has eyes that are larger than its brain?',
    q2: 'What is the only snake in the world that builds a nest for its eggs?',
    q3: 'What is the only mammal born with horns?',
    q4: 'What animal has the fastest metabolism?',
    q5: 'What is the largest rodent found in North America?',
    q6: 'What is the only bird known to fly backwards?',
    q7: 'What is the only mammal that can truly fly?'
  },
  options: {
    q1: ['Peacock', 'Owl', 'Ostrich', 'Eagle'],
    q2: ['King Cobra', 'Rattlesnake', 'Garter Snake', 'Black Mamba'],
    q3: ['Rhino', 'Deer', 'Bison', 'Giraffe'],
    q4: ['Rabbit', 'Gerbil', 'Cheetah', 'Hummingbird'],
    q5: ['Gopher', 'Beaver', 'Deer Mouse', 'Rat'],
    q6: ['Woodpecker', 'Sparrow', 'Hummingbird', 'Robin'],
    q7: ['The Bat', 'Flying Squirrel', 'Flying Lemurs', 'Colugos']
  },
  answers: {
    q1: 'Ostrich',
    q2: 'King Cobra',
    q3: 'Giraffe',
    q4: 'Hummingbird',
    q5: 'Beaver',
    q6: 'Hummingbird',
    q7: 'The Bat'
  },

  startGame: function () {
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);

    $('#game').show();

    $('#results').html('');

    $('#timer').text(trivia.timer);

    $('#start').hide();

    $('#remaining-time').show();

    trivia.nextQuestion();

  },

  nextQuestion: function () {

    trivia.timer = 10;
    $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);

    if (!trivia.timerOn) {
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }

    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);

    var questionOptions = Object.values(trivia.options)[trivia.currentSet];

    $.each(questionOptions, function (index, key) {
      $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
    })

  },

  timerRunning: function () {
    if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
      $('#timer').text(trivia.timer);
      trivia.timer--;
      if (trivia.timer === 4) {
        $('#timer').addClass('last-seconds');
      }
    }
    else if (trivia.timer === -1) {
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was: ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
    }
    else if (trivia.currentSet === Object.keys(trivia.questions).length) {

      $('#results')
        .html('<h3>Results:</h3>' +
          '<p>Correct: ' + trivia.correct + '</p>' +
          '<p>Incorrect: ' + trivia.incorrect + '</p>' +
          '<p>Unanswered: ' + trivia.unanswered + '</p>' +
          '<p>Play again by clicking below</p>');

      $('#game').hide();

      $('#start').show();
    }

  },

  guessChecker: function () {

    var resultId;

    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

    if ($(this).text() === currentAnswer) {
      $(this).addClass('btn-success').removeClass('btn-info');

      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 2000);
      $('#results').html('<h3>Correct!</h3>');
    }
    else {
      $(this).addClass('btn-danger').removeClass('btn-info');

      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 4000);
      $('#results').html('<h3>Incorrect, the right answer is: ' + currentAnswer + '</h3>');
    }

  },
  guessResult: function () {

    trivia.currentSet++;

    $('.option').remove();
    $('#results h3').remove();

    trivia.nextQuestion();

  }

}