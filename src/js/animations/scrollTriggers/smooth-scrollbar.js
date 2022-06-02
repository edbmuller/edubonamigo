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

export function SmoothScrollbar() {
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

const fixGsapMarkers = () => {
	// Only necessary to correct marker position - not needed in production
	if (document.querySelector('.gsap-marker-scroller-start')) {
		const markers = gsap.utils.toArray('[class *= "gsap-marker"]')

		scrollbar.addListener(({ offset }) => {
			gsap.set(markers, { marginTop: -offset.y })
		})
	}
}
