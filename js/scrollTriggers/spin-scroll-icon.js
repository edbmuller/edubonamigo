import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DOM = {
	scrollIcon: document.querySelector('.scroll-icon'),
	sectionHero: document.querySelector('.section--hero')
}

export default function spinScrollIcon() {
	gsap.to(DOM.scrollIcon, {
		rotation: 360 / 2,
		y: '-200px',
		ease: 'none',
		autoAlpha: 0,
		scrollTrigger: {
			trigger: DOM.sectionHero,
			start: 'top top',
			end: 'center top',
			scrub: true
			// markers: true
		}
	})
}
