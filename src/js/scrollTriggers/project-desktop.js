import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { toggleActiveSlide } from '../animations/projects'

gsap.registerPlugin(ScrollTrigger)

const DOM = {
	container: document.querySelector('.container'),
	firstProject: document.querySelector('.project:first-child'),
	lastProject: document.querySelector('.project:last-child'),
	marquees: document.querySelectorAll('.marquee'),
	slider: document.querySelector('.slider'),
	sliderWrapper: document.querySelector('.slider__img--wrapper'),
	sliderImg: document.querySelector('.slider__img'),
	sliderImgMask: document.querySelector('.slider__img--mask'),
	get: (selector) => document.querySelector(selector),
	active: undefined
}

let tl

export function activeProjectDesktop() {
	gsap.set(DOM.sliderImg, { xPercent: -101 })
	gsap.set(DOM.sliderImgMask, { xPercent: 100, scale: 1.3 })
	setMarqueeWidth()

	createSliderIntro()

	gsap.to(DOM.sliderWrapper, {
		duration: 1,
		y: '-18vh',
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
				tl.play()
			},
			onEnterBack: () => {
				activeProject()
				tl.play()
			},
			onLeave: () => {
				desactiveProject()
				tl.reverse()
			},
			onLeaveBack: () => {
				desactiveProject()
				tl.reverse()
			}
		}
	})
}

const setMarqueeWidth = () => {
	console.log('setMarqueeWidth')
	DOM.marquees.forEach((marquee) =>
		gsap.set(marquee, { width: calcMarqueeWidth })
	)
}

const calcMarqueeWidth = () => {
	let pageWidth = document.body.clientWidth
	let containerGap = parseInt(getComputedStyle(DOM.container).marginLeft)
	let sliderLeft = parseInt(getComputedStyle(DOM.slider).left)
	let sliderWidth = DOM.slider.offsetWidth
	if (pageWidth < 1920) {
		return pageWidth - (sliderWidth + 5 + containerGap * 2)
	} else {
		return pageWidth - (sliderWidth + containerGap + sliderLeft + 5)
	}
}

const createSliderIntro = () => {
	tl = gsap
		.timeline({
			paused: true,
			duration: 0.3,
			ease: 'power2.out'
		})
		.to(DOM.sliderImg, { xPercent: 0 }, 0)
		.to(DOM.sliderImgMask, { xPercent: 0, scale: 1 }, 0)
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
