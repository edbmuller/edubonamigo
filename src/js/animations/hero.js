import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import initScrollTriggers from '../scrollTriggers'

import initCustomCursor from './custom-cursor'

gsap.registerPlugin(Flip)

const DOM = {
	body: document.body,
	scrollbarWrapper: document.querySelector('#scrollbar-wrapper'),
	dotsWrapper: document.querySelector('.dots'),
	dotsArr: gsap.utils.toArray('.dot'),
	headerWrapper: document.querySelector('.header__wrapper'),
	headerTitlesArr: gsap.utils.toArray('.header__title'),
	headerLang: document.querySelector('.header__lang'),
	headerTheme: document.querySelector('.header__theme'),
	headerLine: document.querySelector('.header__line'),
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
		onComplete: () => {
			initIntro()
			initCustomCursor()
		}
	})
}

const initIntro = () => {
	// setHeaderWrapperSize()

	const introTl = gsap.timeline({
		defaults: {
			duration: 0.5
		},
		ease: 'power2.in'
	})

	introTl
		.to(DOM.headerLine, { x: '0' })
		.to(
			[DOM.headerTheme, DOM.headerLang, DOM.headerTitlesArr[0]],
			{
				y: '0',
				autoAlpha: 1,
				stagger: 0.2,
				onStart: () => {
					DOM.body.classList.remove('--loading')
					DOM.scrollSVG.classList.add('--spin')
				}
			},
			'-=0.6'
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
