import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DOM = {
	firstProject: document.querySelector('.project:first-child'),
	lastProject: document.querySelector('.project:last-child'),
	slider: document.querySelector('.slider-desktop'),
	get: (selector) => document.querySelector(selector),
	active: undefined
}

export default function activeProjectDesktop() {
	ScrollTrigger.create({
		trigger: DOM.firstProject,
		start: 'top 60%',
		endTrigger: DOM.lastProject,
		end: 'top 10%',
		id: 'project',
		onEnter: () => activeProject(),
		onEnterBack: () => activeProject(),
		onLeave: () => desactiveProject(),
		onLeaveBack: () => desactiveProject()
	})
}

const activeProject = () => {
	DOM.firstProject.classList.add('--active')
	DOM.slider.classList.add('--active')
	DOM.slider.removeAttribute('style')
}

const desactiveProject = () => {
	DOM.get('.project.--active').classList.remove('--active')
	DOM.slider.classList.remove('--active')
	DOM.slider.removeAttribute('style')
}
