var input = document.getElementsByClassName("answer")[0];

var Question = function(from, to) {
	this.from = from;
	this.to = to;
	this.level = 1;
	this.noRepeat = false;
	this.extraRepeat = false;
}

var questions = [
	new Question("a", "b"),
	new Question("1", "2"),
	new Question("x", "y"),
]

function nextQuestion() {
}




input.addEventListener('keyup',function(e){
	if (e.keyCode === 13) {
		checkAnswer(input.value);
	}
});


function checkAnswer(answer) {
}