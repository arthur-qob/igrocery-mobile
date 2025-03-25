type ColorsTypes = {
	[key: string]: any
}

export const Colors: ColorsTypes = {
	light: {
		text: 'rgb(0, 0, 0)',
		background: 'rgb(242, 242, 247)',
		panel: 'rgb(255, 255, 255)',
		panelBorder: 'rgba(108, 108, 112, 0.25)',
		inactiveIconColor: 'rgb(108, 108, 112)',
		border: 'rgb(24, 24, 24)',
	},
	dark: {
		text: 'rgb(255, 255, 255)',
		background: 'rgb(0, 0, 0)',
		panel: 'rgb(28, 28, 30)',
		inactiveIconColor: 'rgb(142, 142, 147)',
		border: 'rgb(225, 225, 225)',
	},
	backgroundElement: {
		1: {
			color1: 'rgb(18, 229, 229)',
			color2: 'rgb(229, 98, 255)',
			color3: 'rgb(255, 86, 83)',
			borderColor: 'rgba(255, 210, 141, 0.7)',
		},
		2: {
			color1: 'rgb(48, 219, 91)',
			color2: 'rgb(102, 212, 207)',
			color3: 'rgb(10, 132, 255)',
			borderColor: 'rgba(255, 210, 141, 0.7)',
		},
	},
	danger: 'rgb(255, 59, 48)',
	activeTintColor: 'rgb(255, 255, 255)',
}
