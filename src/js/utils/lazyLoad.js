const el = {
	image: '.image--lazy-load'
}

export const lazyLoadImages = () => {
	document
		.querySelectorAll(el.image)
		.forEach((img) => (img.src = img.dataset.src))
}
