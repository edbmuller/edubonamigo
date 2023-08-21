const DOM = {
	projectTitles: document.querySelectorAll('.project h3'),
	get: (selector) => document.querySelector(selector)
}

const toggleProjects = (e) => {
	const project = e.currentTarget.parentNode.parentNode
	const projectId = project.dataset.id

	toggleActiveProject(project)
	toggleActiveVideo(projectId)
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

export function toggleActiveVideo(id) {
	const video = DOM.get('#' + id)

	if (!isActive(video)) {
		const lastActiveVideo = DOM.get('.project-slider__img .--active')
		if (lastActiveVideo) {
			lastActiveVideo.currentTime = 0
			lastActiveVideo.pause()
			lastActiveVideo.classList.remove('--active')
		}
		video.classList.add('--active')
		video.play()
	}
}

DOM.projectTitles.forEach((title) =>
	title.addEventListener('mouseenter', toggleProjects)
)
