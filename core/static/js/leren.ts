let input = <HTMLInputElement>document.getElementsByClassName("answer")[0];

// Level 0: new block
// Level 1: hard (seen, but wrong on first try)
// Level 2: familiar (correct on first try)
// Level 3: known
// Level 4: known well
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

let questions = shuffle([
	new Question("q1", "a1"),
	new Question("q2", "a2"),
	new Question("q3", "a3"),
	new Question("q4", "a4"),
	new Question("q5", "a5"),
	new Question("q6", "a6"),
	new Question("q7", "a7"),
	new Question("q8", "a8"),
	new Question("q9", "a9"),
	new Question("q10", "a10"),
]);
let blocks = blockify(questions, 3);


function shuffle(arr) {
	return arr.sort(() => Math.random() - 0.5);
}


/**
 * Divides a question array in blocks that can then be used for Leitner System stuff
 * @param questions array of Question objects
 * @param blockLength number of questions in a block
 */
function blockify(questions: object[], blockLength: number) {
	let blocks = [];
	for (let block = 0; block < Math.ceil(questions.length / blockLength); block++) {  // Create blocks
		blocks[block] = [];
		for (let i = 0; i < blockLength; i++) {  // Fill block with blockLength amount of questions
			let index = block*blockLength +  i;
			let question = questions[index];
			if (question) blocks[block].push(question);
		}
	}
	return blocks;
}


// Mode 0: add new block to level 0
// Mode 1: repeat level 1
// Mode 2: repeat level 1, 2
// Mode 3: repeat level 1, 2, 3
// Mode 4: repeat level 1, 2, 3, 4
// Mode 5: repeat level 1, 2, 3, 4, 5
let mode: number = 0;

// TODO: fix levels
function updateQueue() {
	let queue: object[] = [];
	if (mode === 0) {
		let block = blocks.pop();
		queue = queue.concat(block);  // Add block to queue
	}
	else if (mode >= 1 && mode <= 5) {
		for (const question of questions) {  // Add all questions with a level under the mode
			if (question.level && question.level <= mode) {
				queue.push(question);
			}
		}
	}
	mode = (mode === 5) ? 0 : mode+1;  // Increment mode and flip back to 0 when at 5
	return queue;
}

function checkAnswer(answer) {
}


input.addEventListener('keyup', function(e){
	if (e.keyCode === 13) {
		checkAnswer(input.value);
	}
});


function nextLevel(queue) {
	for (const question of queue) {
		question.level++;
	}
}


let queue = [];
for (let i = 0; i < 20; i++) {
	queue = updateQueue();
	console.log(queue);
	nextLevel(queue);
}