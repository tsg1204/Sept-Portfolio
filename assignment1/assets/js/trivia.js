$(document).ready(function(){

    quiz.reset();


    $('#start').on("click", function(){ 
        //timer.start();
        quiz.displayQuestion(quiz.index);
        showQuestion = setInterval(quiz.nextQuestion, 10000);
    })

    $(document).on('click', '.option', quiz.displayAnswer);


    $('#start-over').on("click", function(){
        clearInterval(showOver);
        quiz.reset(); 
        $('#question-contaner').show();
        timer.start();
        quiz.displayQuestion(quiz.index);
        showQuestion = setInterval(quiz.nextQuestion, 10000);
    })

});

var timer = {
    start: function() {
        counter = setInterval(timer.countDown, 1000); // here timer should be counting    
    },
    stop: function() {
        quiz.time = 10;
        clearInterval(counter);
    },
    countDown: function() {
        
        $('#timer').show();
        $('#timer').html('Time remaining: ' + quiz.time + ' sec.');
        quiz.time--;
    }    
}

var quiz = {
    quizList: [{
                question: "When is tornadoes season in Nebraska?",
                choices: ["Year around", "Summer", "Spring", "Not a tornadoes state"],
                correctAnswer: 0,
                image: "assets/images/tornado.jpg"},
            {
                question: "This is water vapor that forms on a dust particle that becomes heavy enough to fall from the sky.",
                choices: ["Sleet", "Snow", "Rain", "Hail"],
                correctAnswer: 3,
                image: "assets/images/hail.jpg"},
            {
                question: "What is the middle of a hurricane called?",
                choices: ["Belly", "Button", "Eye", "Circle"],
                correctAnswer: 2,
                image: "assets/images/hurricane.jpg"},
            {
                question: "Which clouds looks like heaps of cotton?",
                choices: ["Cumulus", "Stratus", "Cumulonimbus", "Cirrus"],
                correctAnswer: 2,
                image: "assets/images/cumul.jpg"}
        ],  
    time: 10,
    index: 0,
    correct: 0,
    incorrect: 0,
    timesUp: 0,
    outOfTime: false,
    reset: function() {
        quiz.time = 10;
        quiz.index = 0;  
        quiz.correct = 0;
        quiz.incorrect = 0;
        quiz.timesUp = 0;
        quiz.outOfTime = false;
        $('#timer'). hide();
        $('#question').hide();
        $('#choices').hide();
        $('#game-over-contaner').hide();
        $('#start-over').hide();        
    },

    displayQuestion: function(index){
        timer.start();
        quiz.outOfTime = false;
       // console.log('time from display: ' + quiz.time);
        $('#start').hide();
        $('#question-contaner').show();
        $('#question').show();
        $('#choices').show();

        $('#question').html(''+ quiz.quizList[index].question + ' ');
        $('#choices').empty();

        for (var i = 0; i < quiz.quizList[index].choices.length; i++ ) {

            $('#choices').append('<li id="' + i + '" class="list-group-item list-group-item-info option">' + quiz.quizList[index].choices[i] + '</li>');
        
            console.log(quiz.quizList[index].choices[i]);
        }


    },

    nextQuestion() {
       // timer.start();
        clearInterval(showQuestion);
        $('#answer').remove();
        $('#myImg').remove();
        quiz.index++;

        //****************** not working
        if (quiz.time  < 0) {   
            //console.log('Time"s up: ' + quiz.time);
            //timer.stop();
            quiz.outOfTime = true;
            quiz.displayAnswer();
            quiz.index--;
        //****************** not working
        }
        else {
            //quiz.index++;
            //console.log('Quiz index next: ' + quiz.index);
            showQuestion = setInterval(quiz.nextQuestion, 10000);
            quiz.displayQuestion(quiz.index);
        }
    },

    displayAnswer() {
        timer.stop();
        $('#question-contaner').hide();
        $('#question').hide();
        $('#choices').hide();
        $('#answer-contaner').show();

        var answerIndx = $('#choices li').index(this);
        console.log('My answer: ' + answerIndx + ' | Right one: ' + quiz.quizList[quiz.index].choices[quiz.quizList[quiz.index].correctAnswer]);
        console.log('Quiz index: ' + quiz.index);

        var aPicture = $('<img>');
        aPicture.attr('id','myImg');
        aPicture.attr('src', quiz.quizList[quiz.index].image);    // not working
        aPicture.attr('alt', 'weather image');

        var myAnswer = $('<div>');
        myAnswer.attr('id', 'answer');   

        if (answerIndx === quiz.quizList[quiz.index].correctAnswer) {
            quiz.correct++;

            myAnswer.text(' Correct! It is '+ quiz.quizList[quiz.index].choices[quiz.quizList[quiz.index].correctAnswer] + '!');
        }
        //incorrect answer
        if (answerIndx != quiz.quizList[quiz.index].correctAnswer) {
            quiz.incorrect++;

            //if answer is not correct

            myAnswer.text(' No :( The correct answer: '+ quiz.quizList[quiz.index].choices[quiz.quizList[quiz.index].correctAnswer] + ' ');            
        }
        //*******************  not working
        //time is up
        if (quiz.outOfTime === true) {   
            quiz.time = 10;
            quiz.timesUp++;

            myAnswer.text(' Your time is up! Correct answer: '+ quiz.quizList[quiz.index].choices[quiz.quizList[quiz.index].correctAnswer] + ' ');
        }

        $('#answer-contaner').append(myAnswer);
        $('#answer-contaner').append(aPicture);

        if (quiz.index == (quiz.quizList[quiz.index].choices.length - 1)) {
            //console.log('over');
            clearInterval(showQuestion);

            showOver = setInterval(quiz.quizOver, 1000);
        }
        else {
            clearInterval(showQuestion);
            showQuestion = setInterval(quiz.nextQuestion, 2000);
        }
    },

    quizOver: function() {
        timer.stop();
        $('#answer-contaner').hide();
        $('#question-contaner').hide();        
        $('#game-over-contaner').show();
        $('#correct-answers').html('Correct answers: ' + quiz.correct);
        $('#incorrect-answers').html('Incorrect answers: ' + quiz.incorrect);
        $('#unanswered').html('Unanswered questions: ' + quiz.timesUp); 
        $('#myImg').remove();
        $('#answer').remove(); 
        $('#start-over').show();      
    }
};


