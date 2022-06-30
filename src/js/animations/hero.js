import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import initScrollTriggers from '../scrollTriggers'

import initCursor from './cursor'

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
	sectionHero: document.querySelector('.section--hero'),
	contentArr: gsap.utils.toArray('.--hide-show'),
	scrollIcon: gsap.utils.toArray('.scroll-icon')
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
			initCursor()
		}
	})
}

const initIntro = () => {
	// setHeaderWrapperSize()

	const introTl = gsap.timeline({
		defaults: {
			duration: 0.8
		},
		ease: 'power2.in',
		onStart: () => DOM.body.classList.remove('--loading')
	})

	introTl
		.to(DOM.headerLine, { x: '0' })
		.to(
			[DOM.headerTheme, DOM.headerLang, DOM.headerTitlesArr[0]],
			{
				y: '0',
				stagger: 0.2
			},
			'0'
		)
		.from(
			[DOM.scrollIcon, DOM.heroTitlesArr],
			{
				y: '100%',
				stagger: 0.06
			},
			'0'
		)
}

// TODO: Trigger when imagesLoaded is loaded (ref: gsap-demos)
document.addEventListener('DOMContentLoaded', stopLoadingAndInitIntro())
