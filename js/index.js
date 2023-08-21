import '../fonts/CenturyGothic.woff2'
import '../fonts/CenturyGothic.woff'

import mobile from 'is-mobile'
import './utils/checkMobileRefreshOnResize'

import { stopLoadAndInit } from './animations/load-init'
import './animations/toggle-theme'
import './animations/header-menu'
import './animations/projects'

import magneticElement from './animations/magneticElement'

if (!mobile({ tablet: true })) {
	magneticElement()
}

const initApp = () => {
	setTimeout(() => {
		stopLoadAndInit()
	}, 3000)
}

document.addEventListener('load', initApp())

// TODO: ativar algum experimento com webgl quando usar o macete
// console.log('Macete: → ↑ ← ↓ e d !')
