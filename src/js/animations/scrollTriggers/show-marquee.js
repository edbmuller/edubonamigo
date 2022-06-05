import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DOM = {
	marquees: gsap.utils.toArray('.marquee__inner'),
	projects: gsap.utils.toArray('.project')
}

export default function showMarquee() {
	DOM.marquees.forEach((marquee, index) => {
		gsap.to(marquee, {
			ease: 'expo',
			autoAlpha: 1,
			animationPlayState: 'running',
			scrollTrigger: {
				// markers: true,
				trigger: marquee,
				start: 'top 80%',
				end: 'top 10%',
				toggleActions: 'play reverse play reverse',
				id: 'marquee'
			},
			onEnter: () => DOM.projects[index].classList.add('--active'),
			onLeave: () => DOM.projects[index].classList.remove('--active')
		})
	})
}
