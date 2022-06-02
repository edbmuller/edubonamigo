import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const DOM = {
	headerSubtitles: gsap.utils.toArray('.header__title:not(:first-child)'),
	sections: gsap.utils.toArray('.section'),
	headerDots: gsap.utils.toArray('.nav__dot')
}

export default function toggleHeaderSubtitleAndDots() {
	let configs = {
		duration: 0.4,
		ease: 'power4.out'
	}

	DOM.headerSubtitles.forEach((element, index) => {
		ScrollTrigger.create({
			trigger: DOM.sections[index + 1],
			start: 'top 40%',
			end: 'bottom 40%',
			// markers: true,
			onEnter: () => {
				gsap.to(element, { y: '-110%', ...configs })
				DOM.headerDots[index].classList.add('theme--background')
			},
			onLeave: () => gsap.to(element, { y: '-220%', ...configs }),
			onEnterBack: () => gsap.to(element, { y: '-110%', ...configs }),
			onLeaveBack: () => {
				gsap.to(element, { y: '0%', ...configs })
				DOM.headerDots[index].classList.remove('theme--background')
			}
		})
	})
}
