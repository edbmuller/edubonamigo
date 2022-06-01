import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scrollbar, { ScrollbarPlugin } from 'smooth-scrollbar'
gsap.registerPlugin(ScrollTrigger)

DOM = {
	scroller: document.querySelector('.scroller'),
	headerTitles: gsap.utils.toArray('.header__title'),
	headerSubtitles: gsap.utils.toArray('.header__title:not(:first-child)'),
	headerDots: gsap.utils.toArray('.nav__dot'),
	sections: gsap.utils.toArray('.section'),
	sectionHero: document.querySelector('.section--hero'),
	fadeElements: document.querySelectorAll('.--fade'),
	scrollSVG: document.querySelector('.svg-wrapper')
}

class MobilePlugin extends ScrollbarPlugin {
	static pluginName = 'mobile'
	static defaultOptions = {
		speed: 0.5
	}

	transformDelta(delta, fromEvent) {
		if (fromEvent.type !== 'touchend') {
			return delta
		}

		return {
			x: delta.x * this.options.speed,
			y: delta.y * this.options.speed
		}
	}
}

Scrollbar.use(MobilePlugin)

let scrollbar

const initScrollbar = () => {
	scrollbar = Scrollbar.init(DOM.scroller, {
		delegateTo: document,
		alwaysShowTracks: true,
		plugins: {
			mobile: {
				// this is optional
				speed: 0.5
			}
		}
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

const toggleHeaderSubtitleAndDots = () => {
	let configs = {
		duration: 0.4,
		ease: 'power4.out'
	}

	DOM.headerSubtitles.forEach((element, index) => {
		ScrollTrigger.create({
			trigger: DOM.sections[index + 1],
			start: 'top 40%',
			end: 'bottom 40%',
			// markers: true,
			onEnter: () => {
				gsap.to(element, { y: '-110%', ...configs })
				DOM.headerDots[index].classList.add('theme--background')
			},
			onLeave: () => gsap.to(element, { y: '-220%', ...configs }),
			onEnterBack: () => gsap.to(element, { y: '-110%', ...configs }),
			onLeaveBack: () => {
				gsap.to(element, { y: '0%', ...configs })
				DOM.headerDots[index].classList.remove('theme--background')
			}
		})
	})
}

const linkToSection = () => {
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

const fadeInOut = () => {
	DOM.fadeElements.forEach((element) => {
		gsap.from(element, {
			autoAlpha: 0,
			duration: 0.3,
			ease: 'power4.out',
			scrollTrigger: {
				trigger: element,
				start: '0 90%',
				end: '0 5%',
				toggleActions: 'play reverse play reverse'
				// markers: true
			}
		})
	})
}

const spinScrollSVG = () => {
	gsap.to(DOM.scrollSVG, {
		rotation: 360,
		y: '-200px',
		ease: 'none',
		duration: 1,
		scrollTrigger: {
			trigger: DOM.sectionHero,
			start: 'top top',
			end: 'bottom top',
			scrub: true
			// markers: true
		}
	})
}

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
	if (document.querySelector('.gsap-marker-scroller-start')) {
		const markers = gsap.utils.toArray('[class *= "gsap-marker"]')

		scrollbar.addListener(({ offset }) => {
			gsap.set(markers, { marginTop: -offset.y })
		})
	}
}

export default function init() {
	initScrollbar()
	toggleHeaderSubtitleAndDots()
	linkToSection()
	spinScrollSVG()
	fadeInOut()

	// Only necessary to correct marker position - not needed in production
	fixGsapMarkers()
}
