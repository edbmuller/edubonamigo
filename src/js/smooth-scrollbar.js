import Scrollbar from 'smooth-scrollbar'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

let bodyScrollBar

bodyScrollBar = Scrollbar.init(document.querySelector('#scrollbar-wrapper'), {
	damping: 0.07
})

bodyScrollBar.track.xAxis.element.remove()

// Tell ScrollTrigger to use these proxy getter/setter methods for the "body" element:
ScrollTrigger.scrollerProxy(document.body, {
	scrollTop(value) {
		if (arguments.length) {
			bodyScrollBar.scrollTop = value // setter
		}
		return bodyScrollBar.scrollTop // getter
	}
})

// when the smooth scroller updates, tell ScrollTrigger to update() too:
bodyScrollBar.addListener(ScrollTrigger.update)
