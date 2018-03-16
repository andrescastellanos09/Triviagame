var triviaQuestions = [{
	question: "Who holds the record of longest suspension in the NBA history?",
	answerList: ["Ron Artest", "Michael Jordan", "Dennis Rodman", "Steph Curry"],
	answer: 0
},{
	question: "Which team has the record for the longest losin streak in NBA history?",
	answerList: ["Chicago Bulls", "Orlando Magic", "Miami Heat", "Cleveland Cavaliers"],
	answer: 3
},{
	question: "Which number was retired by the Sacramento Kings in honor to their fans?",
	answerList: ["6", "23", "10", "14"],
	answer: 0
},{
	question: "Who holds the record for the most free throws at 9,787 in his career?",
	answerList: ["Karl Malone", "Lebron James", "Ray Allen", "Dwight Howard"],
	answer: 0
},{
	question: "The smallest city that has an NBA franchise is",
	answerList: ["Salt Lake City", "Orlando", "New Jersey", "Phoenix"],
	answer: 0
},{
	question: "Who was the youngest player to start an NBA game at just 18.5 years old?",
	answerList: ["Lebron James", "Kobe Bryant", "Shaquille Oneal", "Dirt Nowitzky"],
	answer: 1
},{
	question: "How many miles can NBA players run in a game?",
	answerList: ["1 mile", "10 miles", "4 miles", "50 miles"],
	answer: 2
},{
	question: "Who  is the NBA’s all-time leader it total assists with 15,806?",
	answerList: ["Steve Nash", "Scottie Pippen", "John Stockton", "Yao Ming"],
	answer: 2
},{
	question: "Which team has won the most NBA championships with 17?",
	answerList: ["Orlando Magic", "Boston Celtics", "Miami Heat", "Sacramento Kings"],
	answer: 1
},{
	question: "Which player has won the most scoring titles? with ten",
	answerList: ["Kobe Bryant", "Michael Jordan", "Steph Curry", "Lebron James"],
	answer: 1
},{
	question: "Who holds the record for the basketball player with the most points in a single game?",
	answerList: ["Wilt Chamberlain", "Dwight Howard", "Kevin Durant", "Magic Johnson"],
	answer: 0
},{
	question: "Who is the best 3-point shooter in the history of the NBA?",
	answerList: ["Steph Curry", "Steve Nash", "Ray Allen", "Magic Johnson"],
	answer: 2
},{
	question: "How many inches can the average NBA player jump?",
	answerList: ["50 inches", "30 inches", "28 inches", "14 inches"],
	answer: 2
},{
	question: "The tallest pro basketball player on earth is Paul Sturgess at",
	answerList: ["7'8", "7'5", "7'6", "7'2"],
	answer: 0
},{
	question: "Who  was the tallest point guard in NBA history?",
	answerList: ["Steve Nash", "Russell Westbrook", "Cris Paul", "Magic Johnson"],
	answer: 3
}];


var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "DUNK",
	incorrect: "AIRBALL",
	endTime: "END OF 4TH QUARTER",
	finished: "WELL PLAYED!"
}

$("#playbtn").on("click", function() {
$(this).hide();newGame();
});

$("#startOverBtn").on("click", function(){
$(this).hide(); newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswer').empty();
	$('#incorrectAnswer').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#countdownTime').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#countdownTime').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#countdownTime').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	

	$('#finalMessage').html(messages.finished);
	$('#correctAnswer').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswer').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}