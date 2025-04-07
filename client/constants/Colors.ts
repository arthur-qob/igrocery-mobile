import { useTheme } from '@/contexts/ThemeContext'
import { Platform } from 'react-native'

export const Colors = {
	light: {
		text: 'rgb(0, 0, 0)',
		background: 'rgb(242, 242, 247)',
		panel: 'rgb(255, 255, 255)',
		panelBorder: 'rgb(142, 142, 147)',
		separator: 'rgb(142, 142, 147)',
		inactiveColor: 'rgb(108, 108, 112)',
		border: 'rgb(24, 24, 24)'
	},
	dark: {
		text: 'rgb(255, 255, 255)',
		background: 'rgb(0, 0, 0)',
		panel: 'rgb(28, 28, 30)',
		panelBorder: 'rgb(72, 72, 74)',
		separator: 'rgb(72, 72, 74)',
		inactiveColor: 'rgb(142, 142, 147)',
		border: 'rgb(225, 225, 225)'
	},
	backgroundElement: {
		1: {
			color1: 'rgb(18, 229, 229)',
			color2: 'rgb(229, 98, 255)',
			color3: 'rgb(255, 86, 83)',
			borderColor: 'rgba(255, 210, 141, 0.7)'
		},
		2: {
			color1: 'rgb(48, 219, 91)',
			color2: 'rgb(102, 212, 207)',
			color3: 'rgb(10, 132, 255)',
			borderColor: 'rgba(255, 210, 141, 0.7)'
		}
	},
	danger: 'rgb(255, 59, 48)',
	success: 'rgb(48, 219, 91)',
	activeTintColor: 'rgb(255, 255, 255)',
	tintColor: 'rgb(10, 132, 255)'
}

export const useColors = () => {
	const { currentTheme } = useTheme()

	const themedColors = {
		text: currentTheme === 'light' ? Colors.light.text : Colors.dark.text,
		background:
			currentTheme === 'light'
				? Colors.light.background
				: Colors.dark.background,
		panel:
			currentTheme === 'light' ? Colors.light.panel : Colors.dark.panel,
		panelBorder:
			currentTheme === 'light'
				? Colors.light.panelBorder
				: Colors.dark.panelBorder,
		separator:
			currentTheme === 'light'
				? Colors.light.separator
				: Colors.dark.separator,
		inactiveColor:
			currentTheme === 'light'
				? Colors.light.inactiveColor
				: Colors.dark.inactiveColor,
		border:
			currentTheme === 'light' ? Colors.light.border : Colors.dark.border
	}

	const staticColors = {
		backgroundElement: Colors.backgroundElement,
		danger: Colors.danger,
		success: Colors.success,
		activeTintColor: Colors.activeTintColor,
		tintColor: Colors.tintColor
	}

	return { themedColors, staticColors }
}
