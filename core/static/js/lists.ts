let block = document.getElementsByClassName("block")[0];
let wordpair = document.getElementsByClassName("wordpair")[0];


function checkSelection(){
	let wordpairs = document.getElementsByClassName("wordpair");
	let lastwordpair = wordpairs[wordpairs.length-1];
	if (lastwordpair.children[1] === document.activeElement) {  // Check if the last wordpair is selected
		// block.insertAdjacentElement("beforeend", wordpair.cloneNode(true));
		// TODO: add wordpair not working?
	}


}

function createList() {
	// TODO: actually make this work
}