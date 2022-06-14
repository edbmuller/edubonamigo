import {
	smoothScrollbar,
	linkToSection,
	scrollToSection,
	fixGsapMarkers
} from './smooth-scrollbar'
import toggleHeaderSubtitleAndDots from './toggle-header-subtitle-and-dots'
import spinScrollSVG from './spin-scroll-svg'
import { fadeIn, fadeOut } from './fade-in-out'
// project triggers
import marqueeOnMobile from './marquee-mobile'
import { activeProjectDesktop } from './project-desktop'

export default function initScrollTriggers() {
	smoothScrollbar()
	toggleHeaderSubtitleAndDots()
	linkToSection()
	// scrollToSection()
	spinScrollSVG()
	fadeIn()
	fadeOut()

	if (/Mobi|Android/i.test(navigator.userAgent)) {
		marqueeOnMobile()
	} else {
		activeProjectDesktop()
	}

	fixGsapMarkers()
}

// TODO: remove fixGsapMarkers for production
