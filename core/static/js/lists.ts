let block = document.getElementsByClassName("block")[0];
let wordpair = '<div class="wordpair">\n<input type="text" class="from" placeholder="From">\n<input type="text" class="to" placeholder="To" onfocus="checkSelection()">\n</div>';


function checkSelection(){
	let wordpairs = document.getElementsByClassName("wordpair");
	let lastwordpair = wordpairs[wordpairs.length-1];
	if (lastwordpair.children[1] === document.activeElement) {  // Check if the last wordpair is selected
		block.insertAdjacentHTML("beforeend", wordpair);
	}
}

function createList() {
	// TODO: actually make this work
}