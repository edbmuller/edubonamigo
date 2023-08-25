import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const DOM = {
	container: document.querySelector('.container'),
	headerSubtitles: gsap.utils.toArray('.header__subtitle'),
	headerLine: document.querySelector('.header__line'),
	sections: gsap.utils.toArray('.section')
}

function subtitleOffsetRight(element) {
	const pageWidth = document.body.clientWidth
	const containerGap = parseInt(getComputedStyle(DOM.container).marginLeft)
	const display = getComputedStyle(element).display
	const distanceFromWindowLeftToElementsRightSide =
		element.getBoundingClientRect().right

	if (display === 'none') {
		return 0
	} else {
		return (
			pageWidth - distanceFromWindowLeftToElementsRightSide - containerGap - 100
		)
	}
}

export default function toggleHeaderSubtitleAndLine() {
	const configs = {
		duration: 0.4,
		ease: 'power2.out'
	}

	DOM.headerSubtitles.forEach((subtitle, index) => {
		const xDistance = subtitleOffsetRight(subtitle)

		ScrollTrigger.create({
			// markers: true,
			trigger: DOM.sections[index + 1],
			start: 'top 35%',
			end: 'bottom 35%',
			onEnter: () => {
				gsap.to(subtitle, { y: '0', ...configs })
				gsap.to(DOM.headerLine, { x: -xDistance, ...configs })
			},
			onLeaveBack: () => {
				gsap.to(subtitle, { y: '100%', ...configs })
				if (index === 0) {
					gsap.to(DOM.headerLine, { x: 0, ...configs })
				}
			},
			onLeave: () => gsap.to(subtitle, { y: '-100%', ...configs }),
			onEnterBack: () => {
				gsap.to(subtitle, { y: '0', ...configs })
				gsap.to(DOM.headerLine, { x: -xDistance, ...configs })
			}
		})
	})
}
