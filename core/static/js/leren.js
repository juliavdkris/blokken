var input = document.getElementsByClassName("answer")[0];
var notification = document.getElementsByClassName("notification")[0];
var Question = (function () {
    function Question(from, to) {
        this.level = null;
        this.noRepeat = false;
        this.extraRepeat = false;
        this.from = from;
        this.to = to;
    }
    return Question;
}());
function shuffle(arr) {
    return arr.sort(function () { return Math.random() - 0.5; });
}
function blockify(questions, blockLength) {
    var blocks = [];
    for (var block_1 = 0; block_1 < Math.ceil(questions.length / blockLength); block_1++) {
        blocks[block_1] = [];
        for (var i = 0; i < blockLength; i++) {
            var index = block_1 * blockLength + i;
            var question = questions[index];
            if (question)
                blocks[block_1].push(question);
        }
    }
    return blocks;
}
function checkLevel(level) {
    for (var _i = 0, questions_1 = questions; _i < questions_1.length; _i++) {
        var question = questions_1[_i];
        if (question.level <= level)
            return true;
    }
    return false;
}
var mode = 1;
function updateQueue() {
    if (blocks) {
        var block_2 = blocks.pop();
        if (block_2)
            queue = queue.concat(block_2);
    }
    while (!checkLevel(mode)) {
        if (mode === 4)
            mode = 1;
        else
            mode++;
    }
    for (var _i = 0, questions_2 = questions; _i < questions_2.length; _i++) {
        var question = questions_2[_i];
        if (question.level && question.level <= mode) {
            queue.push(question);
        }
    }
    if (mode === 4)
        mode = 1;
    else
        mode++;
    questions = shuffle(questions);
    return queue;
}
function checkAnswer(answer) {
    var correct = currentQuestion.to.toLowerCase() === answer.toLowerCase();
    var delay = 1000;
    if (currentQuestion.level === null)
        currentQuestion.level = 1;
    if (correct) {
        notification.innerHTML = "Correct!";
        notification.setAttribute("color", "good");
        if (currentQuestion.level < 4)
            currentQuestion.level++;
    }
    else {
        notification.innerHTML = "Wrong! The correct answer was: " + currentQuestion.to;
        notification.setAttribute("color", "bad");
        delay = 2000;
        if (currentQuestion.level > 1)
            currentQuestion.level--;
    }
    notification.setAttribute("show", "true");
    setTimeout(function () {
        notification.setAttribute("show", "false");
        nextQuestion();
    }, delay);
}
function nextQuestion() {
    while (queue.length === 0) {
        queue = updateQueue();
    }
    currentQuestion = queue.pop();
    document.getElementsByClassName("question")[0].innerHTML = currentQuestion.from;
    input.value = "";
    storeProgress();
}
function storeProgress() {
    xhr.open("POST", "/api/storeprogress/" + id);
    xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
    xhr.send(JSON.stringify(questions));
}
function debug_levels() {
    for (var _i = 0, questions_3 = questions; _i < questions_3.length; _i++) {
        var q = questions_3[_i];
        console.log(q.from + " " + q.level);
    }
}
input.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        checkAnswer(input.value);
    }
});
var questions = [];
var blocks = [];
var queue = [];
var currentQuestion = null;
var id = window.location.hash.substr(1);
var url = "/api/getlisttest/" + id;
var xhr = new XMLHttpRequest();
xhr.open("GET", url);
xhr.responseType = "json";
xhr.send();
xhr.onload = function () {
    var res = xhr.response;
    if (navigator.userAgent.indexOf("Trident") > -1) {
        res = JSON.parse(res);
    }
    questions = shuffle(res.response);
    blocks = blockify(questions, 3);
    queue = updateQueue();
    nextQuestion();
};
