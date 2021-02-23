// async function boggleGuess(query) {
// 	// TODO: Make an ajax request to the searchShows api.  Remove
// 	// hard coded data.
// 	// const showsList = [];
// 	const response = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`);
// 	// console.log(shows);

// 	let shows = response.data.map(result => {
// 		let show = result.show;
// 		const { id, name, summary } = result.show;
// 		return {
// 			id,
// 			name,
// 			summary,
// 			image: show.image ? show.image.original : 'https://tinyurl.com/tv-missing'
// 		};
// 	});

// 	return shows;
// }

$('button').on('click', async function getGuess(evt) {
	evt.preventDefault();

	$guess = $(this).closest('form').find("input[name='guess']").val();

	console.log(evt.target);
	console.log($guess);

	const response = await axios.post(`http://127.0.0.1:5000/`);

	// // get closest ancestor with attribute of data-show-id
	// let $show = $(this).closest('[data-show-id]');
	// // get the show-id from element
	// let $showId = $show.data('show-id');

	// // display episode div
	// $('#episodes-area').show();

	// // get episodes based on show id
	// let episodes = await getEpisodes($showId);

	// // populate DOM with episode cards
	// populateEpisodes(episodes);
});
