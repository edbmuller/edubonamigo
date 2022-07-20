import mobile from 'is-mobile'

const applyMobileClass = () => {
	if (mobile({ tablet: true })) {
		document.body.classList.add('--mobile')
	} else {
		document.body.classList.add('--desktop')
	}
}

const refreshPage = () => {
	setTimeout(() => location.reload(), 500)
}

window.addEventListener('load', applyMobileClass)
window.addEventListener('resize', refreshPage)
