import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const DOM = {
	headerSubtitles: gsap.utils.toArray('.header__subtitle'),
	sections: gsap.utils.toArray('.section'),
	headerDots: gsap.utils.toArray('.dot')
}

export default function toggleHeaderSubtitleAndDots() {
	const configs = {
		duration: 0.4,
		ease: 'power2.out'
	}

	DOM.headerSubtitles.forEach((subtitle, index) => {
		ScrollTrigger.create({
			// markers: true,
			trigger: DOM.sections[index + 1],
			start: 'top 35%',
			end: 'bottom 35%',
			onEnter: () => {
				gsap.to(subtitle, { y: '0', ...configs })
			},
			onLeaveBack: () => {
				gsap.to(subtitle, { y: '100%', ...configs })
			},
			onLeave: () => gsap.to(subtitle, { y: '-100%', ...configs }),
			onEnterBack: () => gsap.to(subtitle, { y: '0', ...configs })
		})
	})
}
