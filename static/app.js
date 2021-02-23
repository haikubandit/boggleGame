//
//
//
//
//
//
//
//
//
//

$('form').submit(async function getGuess(evt) {
	evt.preventDefault();

	$guess = $("input[name='guess']").val();
	await axios.get(`http://127.0.0.1:5000/guess`, {
		params: {
			guess: $guess
		}
	});
});
