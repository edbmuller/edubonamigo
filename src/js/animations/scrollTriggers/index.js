import {
	SmoothScrollbar,
	linkToSection,
	fixGsapMarkers
} from './smooth-scrollbar'
import toggleHeaderSubtitleAndDots from './toggle-header-subtitle-and-dots'
import spinScrollSVG from './spin-scroll-svg'
import { fadeIn, fadeOut } from './fade-in-out'

export default function initScrollTriggers() {
	SmoothScrollbar()
	toggleHeaderSubtitleAndDots()
	linkToSection()
	spinScrollSVG()
	fadeIn()
	fadeOut()

	fixGsapMarkers()
}
