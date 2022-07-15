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
	gsap.to(DOM.cursor, { duration: 0.5, x: e.clientX, y: e.clientY })

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

const cursorMouseenter = (sizeClass) => {
	DOM.cursor.classList.add(sizeClass)
}

const cursorMouseout = (sizeClass) => {
	DOM.cursor.classList.remove(sizeClass)
}

const cursorMousedown = () => {
	DOM.cursor.classList.add('--active')
}

const cursorMouseup = () => {
	DOM.cursor.classList.remove('--active')
}

const addListeners = (elements, sizeClass) => {
	elements.forEach((target) => {
		target.addEventListener('mouseenter', () => cursorMouseenter(sizeClass))
	})

	elements.forEach((target) => {
		target.addEventListener('mouseout', () => cursorMouseout(sizeClass))
	})
}

export default function initCursor() {
	if (DOM.cursor) {
		window.addEventListener('mousemove', activeCursor)
		window.addEventListener('mousemove', moveCursor)

		addListeners([...DOM.subtitles, ...DOM.menuItems], '--small')
		addListeners([...DOM.projects, ...DOM.socialLinks], '--medium')
		addListeners([...DOM.scrolls, ...DOM.contact], '--large')

		window.addEventListener('mousedown', () => cursorMousedown())
		window.addEventListener('mouseup', () => cursorMouseup())
	}
}
