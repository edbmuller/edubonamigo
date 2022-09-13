import mobile from 'is-mobile'
import smoothScrollbar from './smooth-scrollbar'
import fadeInOut from './fade-in-out'
// hero
import toggleHeaderSubtitleAndLine from './header-subtitle-line'
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
	fadeInOut()
	toggleHeaderSubtitleAndLine()
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
