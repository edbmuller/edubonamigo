import { SmoothScrollbar, linkToSection } from './smooth-scrollbar'
import toggleHeaderSubtitleAndDots from './toggle-header-subtitle-and-dots'
import spinScrollSVG from './spin-scroll-svg'
import fadeInOut from './fade-in-out'

export default function initScrollTriggers() {
	SmoothScrollbar()
	toggleHeaderSubtitleAndDots()
	linkToSection()
	spinScrollSVG()
	fadeInOut()
}
