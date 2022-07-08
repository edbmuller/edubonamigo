import gsap from 'gsap'

const DOM = {
	headerMenu: document.querySelector('.header__menu'),
	headerEmail: document.querySelector('.header__menu__item.--email'),
	headerLang: document.querySelector('.header__menu__item.--lang'),
	headerTheme: document.querySelector('.header__menu__item.--theme'),
	dotsArr: gsap.utils.toArray('.dot')
}

export function hideMenu() {
	gsap.to([DOM.headerEmail, DOM.headerLang, DOM.headerTheme], {
		duration: 0.6,
		stagger: 0.1,
		y: '150%',
		onStart: () =>
			DOM.dotsArr.forEach((dot) => dot.classList.remove('theme--background'))
	})
}

const showMenu = () => {
	gsap.to([DOM.headerEmail, DOM.headerLang, DOM.headerTheme], {
		duration: 0.6,
		stagger: 0.1,
		y: '0',
		onStart: () =>
			DOM.dotsArr.forEach((dot) => dot.classList.add('theme--background'))
	})
}

DOM.headerMenu.addEventListener('mouseenter', showMenu)
DOM.headerMenu.addEventListener('mouseleave', hideMenu)
