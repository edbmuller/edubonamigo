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

document.addEventListener('load', stopLoadAndInit())

// TODO: ativar algum experimento com webgl quando usar o macete
// console.log('Macete: → ↑ ← ↓ e d !')
