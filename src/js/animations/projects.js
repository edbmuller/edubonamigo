import gsap from 'gsap'

const DOM = {
	projectTitles: document.querySelectorAll('.project h2'),
	get: (selector) => document.querySelector(selector)
}

DOM.projectTitles.forEach((title) =>
	title.addEventListener('click', toggleProject)
)

function toggleProject(e) {
	let project = e.currentTarget.parentNode.parentNode
	if (!isActive(project)) {
		DOM.get('.project.--active').classList.remove('--active')
		project.classList.add('--active')
	}
}

function isActive(element) {
	return element.classList.contains('--active')
}
