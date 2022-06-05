import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DOM = {
	elementsFadeOut: [
		...gsap.utils.toArray('.title-wrapper'),
		...gsap.utils.toArray('.project'),
		...gsap.utils.toArray('.text')
	],
	elementsFadeIn: gsap.utils.toArray('.--fade-in')
}

export function fadeOut() {
	DOM.elementsFadeOut.forEach((element) => {
		gsap.to(element, {
			autoAlpha: 0,
			ease: 'expo',
			scrollTrigger: {
				// markers: true,
				trigger: element,
				start: 'top 10%',
				end: '50% 5%',
				scrub: true,
				toggleActions: 'play reverse play reverse',
				id: 'fadeOut'
			}
		})
	})
}

export function fadeIn() {
	DOM.elementsFadeIn.forEach((element) => {
		gsap.to(element, {
			autoAlpha: 1,
			ease: 'expo',
			scrollTrigger: {
				// markers: true,
				trigger: element,
				start: 'top 85%',
				end: 'bottom 70%',
				scrub: true,
				toggleActions: 'play reverse play reverse',
				id: 'fadeIn'
			}
		})
	})
}
