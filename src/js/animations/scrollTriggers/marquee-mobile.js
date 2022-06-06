import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DOM = {
	marquees: gsap.utils.toArray('.marquee__inner'),
	projects: gsap.utils.toArray('.project')
}

export default function marqueeOnMobile() {
	if (/Mobi|Android/i.test(navigator.userAgent)) {
		DOM.marquees.forEach((marquee, index) => {
			ScrollTrigger.create({
				trigger: marquee,
				start: 'top 80%',
				end: 'top 10%',
				id: 'marquee',
				onEnter: () => DOM.projects[index].classList.add('--active'),
				onLeave: () => DOM.projects[index].classList.remove('--active'),
				onEnterBack: () => DOM.projects[index].classList.add('--active'),
				onLeaveBack: () => DOM.projects[index].classList.remove('--active')
			})
		})
	}
}
