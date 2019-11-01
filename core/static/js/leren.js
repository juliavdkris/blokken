var input = document.getElementsByClassName("answer")[0];
var Question = /** @class */ (function () {
    function Question(from, to) {
        this.level = null;
        this.noRepeat = false;
        this.extraRepeat = false;
        this.from = from;
        this.to = to;
    }
    return Question;
}());
var questions = [
    new Question("a", "b"),
    new Question("1", "2"),
    new Question("x", "y"),
];
function nextQuestion() {
}
input.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        checkAnswer(input.value);
    }
});
function checkAnswer(answer) {
}
