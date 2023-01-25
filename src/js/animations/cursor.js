import gsap from 'gsap'

const DOM = {
	cursor: document.querySelector('.cursor'),
	subtitles: document.querySelectorAll('h2'),
	menuItems: document.querySelectorAll('.header__menu__item'),
	scrolls: document.querySelectorAll('.scroll-icon'),
	projects: document.querySelectorAll('h3'),
	contact: document.querySelectorAll('.contact__CTA__link'),
	socialLinks: document.querySelectorAll('.footer__social__link')
}

const moveCursor = (e) =>
	gsap.to(DOM.cursor, { duration: 0.4, x: e.clientX, y: e.clientY })

const showCursor = () => {
	gsap.to(DOM.cursor, {
		ease: 'power2.out',
		duration: 1,
		opacity: 1,
		delay: 0.4
	})
}

const activeCursor = () => {
	showCursor()
	window.removeEventListener('mousemove', activeCursor)
}

const hoverState = (sizeClass) => {
	DOM.cursor.classList.add(sizeClass)
}

const defaultState = (sizeClass) => {
	DOM.cursor.classList.remove(sizeClass)
}

const clickAtive = () => {
	DOM.cursor.classList.add('--active')
}

const clickMouseUp = () => {
	DOM.cursor.classList.remove('--active')
}

const listenersForStates = (elements, sizeClass) => {
	elements.forEach((target) => {
		target.addEventListener('mouseenter', () => hoverState(sizeClass))
	})

	elements.forEach((target) => {
		target.addEventListener('mouseout', () => defaultState(sizeClass))
	})
}

export default function customCursor() {
	if (DOM.cursor) {
		window.addEventListener('mousemove', activeCursor)
		window.addEventListener('mousemove', moveCursor)

		listenersForStates([...DOM.subtitles, ...DOM.menuItems], '--small')
		listenersForStates([...DOM.projects, ...DOM.socialLinks], '--medium')
		listenersForStates([...DOM.scrolls, ...DOM.contact], '--large')

		window.addEventListener('mousedown', () => clickAtive())
		window.addEventListener('mouseup', () => clickMouseUp())
	}
}
