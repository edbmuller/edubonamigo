import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { toggleActiveSlide } from '../animations/projects'

gsap.registerPlugin(ScrollTrigger)

const DOM = {
	container: document.querySelector('.container'),
	firstProject: document.querySelector('.project:first-child'),
	lastProject: document.querySelector('.project:last-child'),
	marquees: document.querySelectorAll('.project__marquee'),
	slider: document.querySelector('.project-slider'),
	sliderWrapper: document.querySelector('.project-slider__img--wrapper'),
	sliderImgMask: document.querySelector('.project-slider__img--mask'),
	sliderImg: document.querySelector('.project-slider__img'),
	get: (selector) => document.querySelector(selector)
}

let tlEnter, tlOut
const tlDefaults = {
	paused: true,
	duration: 0.2,
	ease: 'power2.out'
}

export function activeProjectDesktop() {
	setMarqueeWidth()
	createSliderEnter()
	createSliderOut()

	gsap.to(DOM.sliderWrapper, {
		duration: 1,
		y: '-10vh',
		ease: 'none',
		scrollTrigger: {
			trigger: DOM.firstProject,
			start: 'top 80%',
			endTrigger: DOM.lastProject,
			end: 'top 20%',
			id: 'project',
			scrub: true,
			onEnter: () => {
				activeProject('first')
				tlEnter.play()
			},
			onLeaveBack: () => {
				desactiveProject()
				tlEnter.reverse()
			},
			onLeave: () => {
				desactiveProject()
				tlOut.play()
			},
			onEnterBack: () => {
				activeProject()
				tlOut.reverse()
			}
		}
	})
}

const setMarqueeWidth = () => {
	DOM.marquees.forEach((marquee) =>
		gsap.set(marquee, { width: calcMarqueeWidth })
	)
}

const calcMarqueeWidth = () => {
	const pageWidth = document.body.clientWidth
	const containerGap = parseInt(getComputedStyle(DOM.container).marginLeft)
	const sliderRight = parseInt(getComputedStyle(DOM.slider).right)
	const sliderWidth = DOM.slider.offsetWidth
	if (pageWidth < 1920) {
		return pageWidth - (sliderWidth + 5 + containerGap * 2)
	} else {
		return pageWidth - (sliderWidth + containerGap + sliderRight + 5)
	}
}

const toggleMarqueeAnimation = (ev) => {
	const marquee = ev.target.firstElementChild

	ev.type === 'mouseenter'
		? marquee.classList.add('--paused')
		: marquee.classList.remove('--paused')
}

const createSliderEnter = () => {
	tlEnter = gsap
		.timeline({ ...tlDefaults })
		.to(DOM.sliderImg, { y: 0 }, 0)
		.to(DOM.sliderImgMask, { y: 0, scale: 1 }, 0)
}

const createSliderOut = () => {
	tlOut = gsap
		.timeline({ ...tlDefaults })
		.to(DOM.sliderImg, { yPercent: -100 }, 0)
		.to(DOM.sliderImgMask, { yPercent: 100, scale: 1 }, 0)
}

const activeProject = (first) => {
	first
		? DOM.firstProject.classList.add('--active')
		: DOM.lastProject.classList.add('--active')

	DOM.slider.classList.add('--active')
	DOM.slider.removeAttribute('style')

	toggleActiveSlide(DOM.get('.project.--active').dataset.id)
}

const desactiveProject = () => {
	DOM.get('.project.--active').classList.remove('--active')
	DOM.slider.classList.remove('--active')
	DOM.slider.removeAttribute('style')
}

window.addEventListener('resize', setMarqueeWidth)

DOM.marquees.forEach((marquee) => {
	marquee.addEventListener('mouseenter', toggleMarqueeAnimation)
	marquee.addEventListener('mouseleave', toggleMarqueeAnimation)
})
