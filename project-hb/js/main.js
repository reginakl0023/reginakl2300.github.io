jQuery(function() {
	initCountdownTimer();
});

function initCountdownTimer() {
	let days = $('.timer-box .column:nth-child(1) .number');
	let hours = $('.timer-box .column:nth-child(2) .number');
	let minutes = $('.timer-box .column:nth-child(3) .number');
	let seconds = $('.timer-box .column:nth-child(4) .number');

	function updateTime() {
		let sec = parseInt(seconds.text());
		let min = parseInt(minutes.text());
		let hr = parseInt(hours.text());
		let d = parseInt(days.text());

		if (sec > 0) {
			seconds.text(sec - 1);
		} else {
			if (min > 0) {
				minutes.text(min - 1);
				seconds.text(59);
			} else if (hr > 0) {
				hours.text(hr - 1);
				minutes.text(59);
				seconds.text(59);
			} else if (d > 0) {
				days.text(d - 1);
				hours.text(23);
				minutes.text(59);
				seconds.text(59);
			} else {
				clearInterval(timer);
			}
		}
	}

	let timer = setInterval(updateTime, 1000);
}
