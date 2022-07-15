import gsap from 'gsap'

const DOM = {
	menuActive: false,
	menu: document.querySelector('.header__menu'),
	contact: document.querySelector('.header__menu__item.--contact'),
	lang: document.querySelector('.header__menu__item.--lang'),
	theme: document.querySelector('.header__menu__item.--theme'),
	dots: document.querySelector('.dots'),
	dotsArr: gsap.utils.toArray('.dot')
}

// Menu funcs
export function hideMenu() {
	gsap.to([DOM.contact, DOM.lang, DOM.theme], {
		delay: 0.2,
		duration: 0.4,
		stagger: 0.05,
		y: '150%',
		onStart: () =>
			DOM.dotsArr.forEach((dot) => dot.classList.remove('theme--background'))
	})
	DOM.menuActive = false
}

const showMenu = () => {
	gsap.to([DOM.contact, DOM.lang, DOM.theme], {
		duration: 0.4,
		stagger: 0.05,
		y: '0',
		onStart: () => {
			DOM.dotsArr.forEach((dot) => dot.classList.add('theme--background'))
		}
	})
	DOM.menuActive = true
}

export function hideMenuOnScroll() {
	if (DOM.menuActive) {
		hideMenu()
	}
}

// Menu events
DOM.dots.addEventListener('mouseenter', showMenu)
DOM.menu.addEventListener('mouseleave', hideMenu)
