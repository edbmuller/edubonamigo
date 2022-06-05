import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import initScrollTriggers from './scrollTriggers'

gsap.registerPlugin(Flip)

const DOM = {
	body: document.body,
	scrollbarWrapper: document.querySelector('#scrollbar-wrapper'),
	dotsWrapper: document.querySelector('.nav__dots'),
	dotsArr: gsap.utils.toArray('.nav__dot'),
	headerLine: document.querySelector('.header__line'),
	headerTitleWrapper: document.querySelector('.header__title-wrapper'),
	headerTitlesArr: gsap.utils.toArray('.header__title'),
	heroTitlesArr: gsap.utils.toArray('.section--hero h1'),
	scrollSVG: document.querySelector('.svg-wrapper.--scroll'),
	sectionHero: document.querySelector('.section--hero'),
	contentArr: gsap.utils.toArray('.--hide-show')
}

function stopLoadingAndInitIntro() {
	initScrollTriggers()

	let state = Flip.getState(DOM.dotsArr)
	DOM.dotsWrapper.style.animation = 'unset'
	Flip.from(state, {
		ease: 'power3.inOut',
		scale: true
	})
	state = Flip.getState(DOM.dotsArr)
	DOM.dotsWrapper.classList.remove('--loading')

	Flip.from(state, {
		duration: 1,
		ease: 'power3.inOut',
		scale: true,
		onComplete: () => initIntro()
	})
}

const setHeaderWrapperSize = () => {
	let height = DOM.headerTitlesArr[0].getBoundingClientRect().height
	let width = DOM.headerTitlesArr[0].getBoundingClientRect().width * 1.2
	DOM.headerTitleWrapper.style.height = `${height}px`
	DOM.headerTitleWrapper.style.width = `${width * 2}px`
	DOM.headerTitlesArr.forEach((el, index) => {
		if (index !== 0) {
			el.style.left = `${width}px`
		}
	})
}

const initIntro = () => {
	setHeaderWrapperSize()

	const introTl = gsap.timeline({
		defaults: {
			duration: 0.5
		},
		ease: 'power2.in'
	})

	introTl
		.to(DOM.headerLine, { x: '0' })
		.to(
			DOM.headerTitlesArr[0],
			{
				y: '-110%',
				autoAlpha: 1,
				// stagger: 0.05,
				onStart: () => {
					DOM.body.classList.remove('--loading')
					DOM.scrollSVG.classList.add('--spin')
				}
			},
			'-=0.2'
		)
		.from(
			[DOM.scrollSVG, DOM.heroTitlesArr],
			{
				y: '100%',
				// autoAlpha: 0,
				stagger: 0.06,
				onStart: () => {
					DOM.body.classList.remove('--loading')
					DOM.scrollSVG.classList.add('--spin')
				}
			},
			'0'
		)
}

// TODO: Trigger when imagesLoaded is loaded (ref: gsap-demos)
document.addEventListener('DOMContentLoaded', stopLoadingAndInitIntro())
