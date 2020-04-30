const menu = {
	startApp:{
		id: 'start_app',
		label: 'Start App',
		type: 'func'
	},
	signOut: {
		id: 'sign_out',
		label: 'Quit',
		type: 'func',
		dividerAbove: true,
		dividerBelow: true,
	},
	enterCode: {
		id: 'enter_code',
		label: 'Enter Code',
		type: 'modal'
	},
	aboutDev: {
		id: 'about_dev',
		label: 'About JJ Rafael',
		type: 'modal',
		dividerAbove: true,
	},
	startSession:{
		id: 'start_session',
		label: 'Start Session',
		type: 'func'
	},
}

export const homeMenu = [
	menu.enterCode,
	menu.signOut,
	menu.aboutDev
]

export const splashMenu = [
	menu.startApp,
	menu.enterCode,
	menu.aboutDev
]

export const aboutMenu = [
	menu.aboutDev
]

export default {
	homeMenu,
	splashMenu,
	aboutMenu,
};