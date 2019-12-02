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
	let wordpairs: any = document.getElementsByClassName("wordpair");
	let name = (<HTMLInputElement>document.getElementsByClassName("listname")[0]).value;

	if (!name) {
		alert("Please give your list a name.");
		return;
	}

	let id = 1;
	let questions = [];
	for (let wordpair of wordpairs) {
		let from = wordpair.children[0].value;
		let to = wordpair.children[1].value;
		if (from && to) {
			questions.push({
				"id": id,
				"from": from,
				"to": to
			});
			id++;
		}
	}
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "/api/createlist");
	xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
	xhr.onload = function() {
		alert("List successfully created!");
	}
	// xhr.send(JSON.stringify(questions));
	xhr.send(JSON.stringify({
		"name": name,
		"content": questions
	}));
}