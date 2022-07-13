import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Scrollbar from 'smooth-scrollbar'
import MobilePlugin from './fix-speed-mobile'

gsap.registerPlugin(ScrollTrigger)
Scrollbar.use(MobilePlugin)

const DOM = {
	scroller: document.querySelector('.scroller'),
	headerTitles: gsap.utils.toArray('.header__titles h2'),
	headerContact: document.querySelector('.header__menu__item.--contact'),
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
		scrollbar.scrollIntoView(DOM.sections[index], {
			damping: 0.07
		})
	})
}

const sectionAnchors = () => {
	DOM.headerTitles.forEach((element, index) => {
		listenerAnchorToSection(element, index)
	})
	listenerAnchorToSection(DOM.headerContact, 3)
}

const scrollIconAnchors = () => {
	DOM.scrollIcon.forEach((element, index) => {
		listenerAnchorToSection(element, index + 1)
	})
}

const completeScrollOnContactSection = () => {
	const contact = DOM.sections.length - 1
	ScrollTrigger.create({
		trigger: DOM.sections[contact],
		start: 'top 50%',
		onEnter: () =>
			scrollbar.scrollIntoView(DOM.sections[contact], { damping: 1 })
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
	sectionAnchors()
	scrollIconAnchors()
	completeScrollOnContactSection()
}
