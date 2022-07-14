const DOM = {
	projectTitles: document.querySelectorAll('.project h3'),
	get: (selector) => document.querySelector(selector)
}

const toggleProjects = (e) => {
	const project = e.currentTarget.parentNode.parentNode
	const projectId = project.dataset.id

	toggleActiveProject(project)
	toggleActiveSlide(projectId)
}

const isActive = (element) => {
	return element.classList.contains('--active')
}

const toggleActiveProject = (projectContainer) => {
	if (!isActive(projectContainer)) {
		DOM.get('.project.--active').classList.remove('--active')
		projectContainer.classList.add('--active')
	}
}

export function toggleActiveSlide(id) {
	const slide = DOM.get('#' + id)

	if (!isActive(slide)) {
		const lastActiveSlide = DOM.get('.project-slider__img .--active')
		if (lastActiveSlide) {
			lastActiveSlide.classList.remove('--active')
		}
		slide.classList.add('--active')
	}
}

DOM.projectTitles.forEach((title) =>
	title.addEventListener('click', toggleProjects)
)
