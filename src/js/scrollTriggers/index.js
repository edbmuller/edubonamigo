import mobile from 'is-mobile'
import smoothScrollbar from './smooth-scrollbar'
import toggleHeaderSubtitleAndDots from './header-toggle-subtitle-and-dots'
import fadeInOut from './fade-in-out'
// hero
import spinScrollIcon from './spin-scroll-icon'
// about
import showAboutImage from './about-image'
// projects
import marqueeOnMobile from './project-marquee-mobile'
import { activeProjectDesktop } from './project-desktop'
// contact
import footerTimeline from './footer-timeline'

export default function initScrollTriggers() {
	smoothScrollbar()
	toggleHeaderSubtitleAndDots()
	fadeInOut()
	spinScrollIcon()
	showAboutImage()
	footerTimeline()

	if (mobile({ tablet: true })) {
		marqueeOnMobile()
	} else {
		activeProjectDesktop()
	}
}

// TODO: remove fixGsapMarkers for production
