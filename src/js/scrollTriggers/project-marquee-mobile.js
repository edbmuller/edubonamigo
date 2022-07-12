import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DOM = {
	marquees: gsap.utils.toArray('.project__marquee__inner'),
	projects: gsap.utils.toArray('.project')
}

export default function marqueeOnMobile() {
	DOM.marquees.forEach((marquee, index) => {
		ScrollTrigger.create({
			trigger: marquee,
			start: 'top 80%',
			end: 'top 10%',
			onEnter: () => activeMarquee(DOM.projects[index]),
			onLeave: () => desactiveMarquee(DOM.projects[index]),
			onEnterBack: () => activeMarquee(DOM.projects[index]),
			onLeaveBack: () => desactiveMarquee(DOM.projects[index])
		})
	})
}

const activeMarquee = (project) => project.classList.add('--active')
const desactiveMarquee = (project) => project.classList.remove('--active')
