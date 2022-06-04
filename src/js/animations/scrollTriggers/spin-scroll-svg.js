import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DOM = {
	scrollSVG: document.querySelector('.svg-wrapper'),
	sectionHero: document.querySelector('.section--hero')
}

export default function spinScrollSVG() {
	gsap.to(DOM.scrollSVG, {
		rotation: 360 / 2,
		y: '-200px',
		ease: 'none',
		autoAlpha: 0,
		duration: 1,
		scrollTrigger: {
			trigger: DOM.sectionHero,
			start: 'top top',
			end: 'center top',
			scrub: true
			// markers: true
		}
	})
}
