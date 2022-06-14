import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Scrollbar from 'smooth-scrollbar'
import MobilePlugin from './fix-speed-mobile'

gsap.registerPlugin(ScrollTrigger)
Scrollbar.use(MobilePlugin)

const DOM = {
	scroller: document.querySelector('.scroller'),
	headerTitles: gsap.utils.toArray('.header__title'),
	sections: gsap.utils.toArray('.section')
}

let scrollbar

export function smoothScrollbar() {
	scrollbar = new Scrollbar(DOM.scroller, {
		delegateTo: document,
		alwaysShowTracks: true
	})

	ScrollTrigger.scrollerProxy('.scroller', {
		scrollTop(value) {
			if (arguments.length) {
				scrollbar.scrollTop = value // setter
			}
			return scrollbar.scrollTop // getter
		}
	})

	scrollbar.addListener(ScrollTrigger.update)
	ScrollTrigger.defaults({ scroller: '.scroller' })

	fixGsapMarkers()
}

// Functions on this folder are the ones that need to interact with the scrollbar object

export function linkToSection() {
	DOM.headerTitles.forEach((element, index) => {
		element.addEventListener('click', (e) => {
			e.preventDefault()
			scrollbar.scrollIntoView(DOM.sections[index], {
				damping: 0.07,
				offsetTop: 100
			})
		})
	})
}

export function scrollToSection() {
	DOM.sections.forEach((section, index) => {
		ScrollTrigger.create({
			// markers: true,
			trigger: section,
			start: 'bottom 40%',
			end: 'bottom center',
			onEnter: () => {
				scrollbar.scrollTo(0, DOM.sections[index + 1].offsetTop - 100, 500)
			}
		})
	})
}

export function fixGsapMarkers() {
	// Only necessary to correct marker position - not needed in production
	if (document.querySelector('.gsap-marker-scroller-start')) {
		const markers = gsap.utils.toArray('[class *= "gsap-marker"]')

		scrollbar.addListener(({ offset }) => {
			gsap.set(markers, { marginTop: -offset.y })
		})
	}
}
