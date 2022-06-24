import initSmoothScrollbar from './smooth-scrollbar'
import toggleHeaderSubtitleAndDots from './toggle-header-subtitle-and-dots'
import spinScrollIcon from './spin-scroll-icon'
import fadeInOut from './fade-in-out'
// project triggers
import marqueeOnMobile from './marquee-mobile'
import { activeProjectDesktop } from './project-desktop'

export default function initScrollTriggers() {
	initSmoothScrollbar()
	toggleHeaderSubtitleAndDots()
	spinScrollIcon()
	fadeInOut()

	if (/Mobi|Android/i.test(navigator.userAgent)) {
		marqueeOnMobile()
	} else {
		activeProjectDesktop()
	}
}

// TODO: remove fixGsapMarkers for production
