var block = document.getElementsByClassName("block")[0];
var wordpair = '<div class="wordpair">\n<input type="text" class="from" placeholder="From">\n<input type="text" class="to" placeholder="To" onfocus="checkSelection()">\n</div>';
function checkSelection() {
    var wordpairs = document.getElementsByClassName("wordpair");
    var lastwordpair = wordpairs[wordpairs.length - 1];
    if (lastwordpair.children[1] === document.activeElement) {
        block.insertAdjacentHTML("beforeend", wordpair);
    }
}
function createList() {
    var wordpairs = document.getElementsByClassName("wordpair");
    var name = document.getElementsByClassName("listname")[0].value;
    if (!name) {
        alert("Please give your list a name.");
        return;
    }
    var id = 1;
    var questions = [];
    for (var _i = 0, wordpairs_1 = wordpairs; _i < wordpairs_1.length; _i++) {
        var wordpair_1 = wordpairs_1[_i];
        var from = wordpair_1.children[0].value;
        var to = wordpair_1.children[1].value;
        if (from && to) {
            questions.push({
                "id": id,
                "from": from,
                "to": to
            });
            id++;
        }
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/createlist");
    xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
    xhr.onload = function () {
        alert("List successfully created!");
    };
    xhr.send(JSON.stringify({
        "name": name,
        "content": questions
    }));
}
