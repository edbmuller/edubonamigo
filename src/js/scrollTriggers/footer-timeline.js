import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DOM = {
	sectionContact: document.querySelector('.section.contact'),
	CTA: document.querySelectorAll('.contact__CTA__link'),
	links: document.querySelectorAll('.footer__social__link'),
	line: document.querySelector('.footer__line'),
	footerTexts: document.querySelectorAll('.footer p')
}

const tl = gsap
	.timeline({
		paused: true,
		defaults: {
			duration: 0.8,
			ease: 'power2.out'
		}
	})
	.from(DOM.CTA, { yPercent: 120 })
	.from(DOM.line, { xPercent: -120 }, 0)
	.from(DOM.links, { yPercent: 120, stagger: 0.1 }, 0)
	.from(DOM.footerTexts, { yPercent: 150, stagger: 0.2 }, 0)

export default function footerTimeline() {
	ScrollTrigger.create({
		trigger: DOM.sectionContact,
		start: '90% bottom',
		onEnter: () => tl.play(),
		onLeaveBack: () => tl.reverse()
	})
}
