const DOM = {
	headerTheme: document.querySelector('.header__menu__item.--theme'),
	body: document.body
}

const toggleTheme = () => {
	if (isDarkMode()) {
		DOM.body.classList.remove('--dark')
		DOM.body.classList.add('--light')
	} else {
		DOM.body.classList.remove('--light')
		DOM.body.classList.add('--dark')
	}
}

const isDarkMode = () => DOM.body.classList.contains('--dark')

DOM.headerTheme.addEventListener('click', toggleTheme)
