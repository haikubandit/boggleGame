//
//
//
//
//
//
//
//
//
let totalScore = 0;

setTimeout(async function() {
	$('button').prop('disabled', true);
	response = await axios.post(`http://127.0.0.1:5000/gameover`, { playerScore: totalScore });
}, 10000);

$('form').submit(async function getGuess(evt) {
	evt.preventDefault();

	$guessInput = $("input[name='guess']").val();
	response = await axios.get(`http://127.0.0.1:5000/guess`, {
		params: {
			word: $guessInput
		}
	});

	generateHTMLResponse(response.data['guess']);
	$('form').trigger('reset');

	console.log(response);
	console.log(response.data['guess']);
	console.log($guessInput);
});

const generateHTMLResponse = response => {
	//remove response if one exists
	$('.response').children('p').remove();

	//create response element
	const answer = document.createElement('p');

	// Set html based on response
	if (response === 'ok') {
		answer.innerHTML = 'You entered a valid word!';
		answer.classList.add('valid');

		//add to score if valid
		calculateScore($guessInput);
	} else if (response === 'not-word') {
		answer.innerHTML = 'That is not a valid word.';
		answer.classList.add('invalid');
	} else {
		answer.innerHTML = 'That word is not on the board!';
		answer.classList.add('invalid');
	}

	// display response on page
	$('.response').append(answer);
};

const calculateScore = word => {
	let $current = $('.current-score');
	let $total = $('.total-score');

	totalScore += word.length;
	$current.text(`Current score: ${word.length}`);
	$total.text(`Total score: ${totalScore}`);

	return totalScore;
};
