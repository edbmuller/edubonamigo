import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DOM = {
	elementsFadeOut: [
		...gsap.utils.toArray('.title-wrapper'),
		...gsap.utils.toArray('.text')
	],
	elementsFadeIn: gsap.utils.toArray('.--fade')
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
				id: 'fadeOutUp'
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
				start: 'top 75%',
				end: 'bottom 60%',
				scrub: true,
				toggleActions: 'play reverse play reverse',
				id: 'fadeInUp'
			}
		})
	})
}
