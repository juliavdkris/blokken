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
}
