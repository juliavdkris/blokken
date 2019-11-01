var input = <HTMLInputElement>document.getElementsByClassName("answer")[0];

class Question {
	from: string;
	to: string;
	level: number = null;
	noRepeat: boolean = false;
	extraRepeat: boolean = false;
	constructor(from: string, to: string) {
		this.from = from;
		this.to = to;
	}
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