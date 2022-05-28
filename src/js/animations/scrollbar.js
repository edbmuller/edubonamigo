import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scrollbar from 'smooth-scrollbar'
gsap.registerPlugin(ScrollTrigger)

DOM = {
	scroller: document.querySelector('.scroller'),
	contentArr: document.querySelectorAll('.--hide-show'),
	scrollSVG: document.querySelector('.--scroll')
}

let scrollbar

const initScrollbar = () => {
	scrollbar = Scrollbar.init(DOM.scroller, {
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
}

const hideShowContent = () => {
	DOM.contentArr.forEach((element) => {
		console.log(element)

		gsap.to(element, {
			duration: 0.5,
			autoAlpha: 0,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: element,
				start: 'top 15%',
				end: 'bottom 15%',
				toggleActions: 'play pause resume reset',
				scrub: true,
				markers: true
			}
		})
	})
}

const spinScrollSVG = () => {}

/* ADD SKEW SECTION */
const skewContent = () => {
	let proxy = { skew: 0 }
	let skewSetter = gsap.quickSetter('.hide-show', 'skewY', 'deg') // fast
	let clamp = gsap.utils.clamp(-20, 20) // don't let the skew go beyond 20 degrees.

	ScrollTrigger.create({
		scroller: '#viewport',
		trigger: '.root',

		onUpdate: (self) => {
			let skew = clamp(self.getVelocity() / -300)
			// only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
			if (Math.abs(skew) > Math.abs(proxy.skew)) {
				proxy.skew = skew
				gsap.to(proxy, {
					skew: 0,
					duration: 0.4,
					ease: 'power3',
					overwrite: true,
					onUpdate: () => skewSetter(proxy.skew)
				})
			}
		}
		// make the right edge "stick" to the scroll bar. force3D: true improves performance
		// gsap.set(".skewElem", {transformOrigin: "right center", force3D: true});
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

export default function init() {
	initScrollbar()
	hideShowContent()
	skewContent()
	fixGsapMarkers()
}
