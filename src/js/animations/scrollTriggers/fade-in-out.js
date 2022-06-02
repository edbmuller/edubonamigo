import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DOM = {
	fadeElements: document.querySelectorAll('.--fade')
}

export default function fadeInOut() {
	DOM.fadeElements.forEach((element) => {
		gsap.from(element, {
			autoAlpha: 0,
			duration: 0.3,
			ease: 'power4.out',
			scrollTrigger: {
				trigger: element,
				start: '0 90%',
				end: '0 5%',
				toggleActions: 'play reverse play reverse'
				// markers: true
			}
		})
	})
}
