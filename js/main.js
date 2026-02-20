jQuery(function() {
	autoscroll();
	flipcard();
});

Fancybox.bind('[data-fancybox="gallery"]', {
	Thumbs: {
		autoStart: true,
	}
});

// auto-scroll
function autoscroll() {
	document.querySelectorAll('.card-front').forEach(column => {
		const img = column.querySelector('.img-holder img');
		const SPEED = 140;
		function getTranslateY(el) {
			const style = getComputedStyle(el).transform;
			if (style === 'none') return 0;
			const matrix = new DOMMatrixReadOnly(style);
			return Math.abs(matrix.m42);
		}
		function stopAnimation(el) {
			const currentY = getTranslateY(el);
			el.style.transition = 'none';
			el.style.transform = `translateY(-${currentY}px)`;
			el.offsetHeight;
			return currentY;
		}
		column.addEventListener('mouseenter', () => {
			stopAnimation(img);

			const containerHeight = column.querySelector('.img-holder').offsetHeight;
			const imageHeight = img.offsetHeight;
			const maxScroll = imageHeight - containerHeight;

			if (maxScroll <= 0) return;

			const duration = maxScroll / SPEED;

			img.style.transition = `transform ${duration}s linear`;
			img.style.transform = `translateY(-${maxScroll}px)`;
		});
		column.addEventListener('mouseleave', () => {
			const currentY = stopAnimation(img);
			if (!currentY) return;
			const duration = currentY / SPEED;
			img.style.transition = `transform ${duration}s ease-out`;
			img.style.transform = 'translateY(0)';
		});
	});
}

// flip-card
function flipcard() {
	document.addEventListener('click', function (e) {
		const btn = e.target.closest('.flip-btn');
		if (!btn) return;
		const card = btn.closest('.card');
		if (!card) return;
		card.classList.toggle('is-flipped');
	});
}
