import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Scrollbar from 'smooth-scrollbar'
import MobilePlugin from './fix-speed-mobile'

gsap.registerPlugin(ScrollTrigger)
Scrollbar.use(MobilePlugin)

const DOM = {
	scroller: document.querySelector('.scroller'),
	headerTitles: gsap.utils.toArray('.header__wrapper h2'),
	sections: gsap.utils.toArray('.section'),
	scrollIcon: gsap.utils.toArray('.scroll-icon')
}

let scrollbar

const smoothScrollbar = () => {
	scrollbar = new Scrollbar(DOM.scroller, {
		delegateTo: document,
		alwaysShowTracks: true
	})

	// integrates scrollbar and scrolltrigger
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

// Functions above on this folder
// are the ones that need to
// interact with the "scrollbar" object variable

const listenerAnchorToSection = (target, index) => {
	target.addEventListener('click', (e) => {
		e.preventDefault()
		scrollbar.scrollIntoView(DOM.sections[index], {
			damping: 0.07,
			offsetTop: 100
		})
	})
}

const subtitleAnchors = () => {
	DOM.headerTitles.forEach((element, index) => {
		listenerAnchorToSection(element, index)
	})
}

const scrollIconAnchors = () => {
	DOM.scrollIcon.forEach((element, index) => {
		listenerAnchorToSection(element, index + 1)
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

export default function initSmoothScrollbar() {
	smoothScrollbar()
	subtitleAnchors()
	scrollIconAnchors()
}
