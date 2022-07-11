import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DOM = {
	about: document.querySelector('.about.section'),
	imageWrapper: document.querySelector('.about__image'),
	image: document.querySelector('.about__image__of__ed')
}

export default function showAboutImage() {
	fadeIn()
	fadeOut()
}

const fadeIn = () => {
	gsap.to(DOM.imageWrapper, {
		css: { opacity: 0.3 },
		scrollTrigger: {
			trigger: DOM.about,
			start: 'top 50%',
			end: 'top 15%',
			scrub: true,
			toggleActions: 'play reverse play reverse'
		}
	})
}

const fadeOut = () => {
	gsap.to(DOM.image, {
		css: { opacity: 0 },
		scrollTrigger: {
			trigger: DOM.about,
			start: 'bottom 70%',
			end: 'bottom 50%',
			scrub: true,
			toggleActions: 'play reverse play reverse'
		}
	})
}
