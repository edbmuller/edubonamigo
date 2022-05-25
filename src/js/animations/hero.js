import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
gsap.registerPlugin(Flip)

const DOM = {
	body: document.body,
	dotsWrapper: document.querySelector('.nav__dots'),
	dotsArr: gsap.utils.toArray('.nav__dot'),
	headerLine: document.querySelector('.header__line'),
	headerTitlesArr: gsap.utils.toArray('.header__title'),
	heroTitlesArr: gsap.utils.toArray('.section--hero h1'),
	scrollSVG: document.querySelector('.svg-wrapper.--scroll'),
	sectionHero: document.querySelector('.section--hero')
}

// TODO: Trigger when imagesLoaded is loaded (ref: gsap-demos)
document.addEventListener('DOMContentLoaded', stopLoadingInitIntro())

function stopLoadingInitIntro() {
	let state = Flip.getState(DOM.dotsArr)
	DOM.dotsWrapper.style.animation = 'unset'
	Flip.from(state, {
		duration: 0.7,
		ease: 'power4.inOut',
		scale: true
	})
	state = Flip.getState(DOM.dotsArr)
	DOM.dotsWrapper.classList.remove('--loading')

	Flip.from(state, {
		duration: 0.7,
		ease: 'power4.inOut',
		scale: true,
		onComplete: () => initIntro()
	})
}

const initIntro = () => {
	const introTl = gsap.timeline({
		defaults: {
			duration: 0.7
		},
		ease: 'power4.in'
	})

	introTl
		.to(DOM.headerLine, { x: 0 })
		.from(
			DOM.headerTitlesArr[0],
			{
				y: '50%',
				autoAlpha: 0,
				// stagger: 0.05,
				onStart: () => {
					DOM.body.classList.remove('--loading')
					DOM.scrollSVG.classList.add('--spin')
				}
			}
			// '-=0.2'
		)
		.from(
			[DOM.scrollSVG, DOM.heroTitlesArr],
			{
				y: '100%',
				// autoAlpha: 0,
				stagger: 0.1,
				onStart: () => {
					DOM.body.classList.remove('--loading')
					DOM.scrollSVG.classList.add('--spin')
				}
			},
			'0'
		)
}
