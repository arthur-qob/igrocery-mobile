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
		border: 'rgb(24, 24, 24)',
		ghost: 'rgb(230, 230, 235)'
	},
	dark: {
		text: 'rgb(255, 255, 255)',
		background: 'rgb(0, 0, 0)',
		panel: 'rgb(28, 28, 30)',
		panelBorder: 'rgb(72, 72, 74)',
		separator: 'rgb(72, 72, 74)',
		inactiveColor: 'rgb(142, 142, 147)',
		border: 'rgb(225, 225, 225)',
		ghost: 'rgb(35, 35, 38)'
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
			currentTheme === 'light' ? Colors.light.border : Colors.dark.border,
		ghost: currentTheme === 'light' ? Colors.light.ghost : Colors.dark.ghost
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

// IconCircle colors
export const colors = [
	'rgb(254, 242, 242)',
	'rgb(254, 226, 226)',
	'rgb(254, 202, 202)',
	'rgb(252, 165, 165)',
	'rgb(248, 113, 113)',
	'rgb(239, 68, 68)',
	'rgb(220, 38, 38)',
	'rgb(185, 28, 28)',
	'rgb(153, 27, 27)',
	'rgb(127, 29, 29)',

	'rgb(255, 247, 237)',
	'rgb(255, 237, 213)',
	'rgb(254, 215, 170)',
	'rgb(253, 186, 116)',
	'rgb(251, 146, 60)',
	'rgb(249, 115, 22)',
	'rgb(234, 88, 12)',
	'rgb(194, 65, 12)',
	'rgb(154, 52, 18)',
	'rgb(124, 45, 18)',

	'rgb(255, 251, 235)',
	'rgb(254, 243, 199)',
	'rgb(253, 230, 138)',
	'rgb(252, 211, 77)',
	'rgb(251, 191, 36)',
	'rgb(245, 158, 11)',
	'rgb(217, 119, 6)',
	'rgb(180, 83, 9)',
	'rgb(146, 64, 14)',
	'rgb(120, 53, 15)',

	'rgb(254, 252, 232)',
	'rgb(254, 249, 195)',
	'rgb(254, 240, 138)',
	'rgb(253, 224, 71)',
	'rgb(250, 204, 21)',
	'rgb(234, 179, 8)',
	'rgb(202, 138, 4)',
	'rgb(161, 98, 7)',
	'rgb(133, 77, 14)',
	'rgb(113, 63, 18)',

	'rgb(247, 254, 231)',
	'rgb(236, 252, 203)',
	'rgb(217, 249, 157)',
	'rgb(190, 242, 100)',
	'rgb(163, 230, 53)',
	'rgb(132, 204, 22)',
	'rgb(101, 163, 13)',
	'rgb(77, 124, 15)',
	'rgb(63, 98, 18)',
	'rgb(54, 83, 20)',

	'rgb(240, 253, 244)',
	'rgb(220, 252, 231)',
	'rgb(187, 247, 208)',
	'rgb(134, 239, 172)',
	'rgb(74, 222, 128)',
	'rgb(34, 197, 94)',
	'rgb(22, 163, 74)',
	'rgb(21, 128, 61)',
	'rgb(22, 101, 52)',
	'rgb(20, 83, 45)',

	'rgb(236, 253, 245)',
	'rgb(209, 250, 229)',
	'rgb(167, 243, 208)',
	'rgb(110, 231, 183)',
	'rgb(52, 211, 153)',
	'rgb(16, 185, 129)',
	'rgb(5, 150, 105)',
	'rgb(4, 120, 87)',
	'rgb(6, 95, 70)',
	'rgb(6, 78, 59)',

	'rgb(240, 253, 250)',
	'rgb(204, 251, 241)',
	'rgb(153, 246, 228)',
	'rgb(94, 234, 212)',
	'rgb(45, 212, 191)',
	'rgb(20, 184, 166)',
	'rgb(13, 148, 136)',
	'rgb(15, 118, 110)',
	'rgb(17, 94, 89)',
	'rgb(19, 78, 74)',

	'rgb(240, 249, 255)',
	'rgb(224, 242, 254)',
	'rgb(186, 230, 253)',
	'rgb(125, 211, 252)',
	'rgb(56, 189, 248)',
	'rgb(14, 165, 233)',
	'rgb(2, 132, 199)',
	'rgb(3, 105, 161)',
	'rgb(7, 89, 133)',
	'rgb(12, 74, 110)',

	'rgb(239, 246, 255)',
	'rgb(219, 234, 254)',
	'rgb(191, 219, 254)',
	'rgb(147, 197, 253)',
	'rgb(96, 165, 250)',
	'rgb(10, 132, 255)',
	'rgb(37, 99, 235)',
	'rgb(29, 78, 216)',
	'rgb(30, 64, 175)',
	'rgb(30, 58, 138)',

	'rgb(238, 242, 255)',
	'rgb(224, 231, 255)',
	'rgb(199, 210, 254)',
	'rgb(165, 180, 252)',
	'rgb(129, 140, 248)',
	'rgb(99, 102, 241)',
	'rgb(79, 70, 229)',
	'rgb(67, 56, 202)',
	'rgb(55, 48, 163)',
	'rgb(49, 46, 129)',

	'rgb(245, 243, 255)',
	'rgb(237, 233, 254)',
	'rgb(221, 214, 254)',
	'rgb(196, 181, 253)',
	'rgb(167, 139, 250)',
	'rgb(139, 92, 246)',
	'rgb(124, 58, 237)',
	'rgb(109, 40, 217)',
	'rgb(91, 33, 182)',
	'rgb(76, 29, 149)',

	'rgb(250, 245, 255)',
	'rgb(243, 232, 255)',
	'rgb(233, 213, 255)',
	'rgb(216, 180, 254)',
	'rgb(192, 132, 252)',
	'rgb(168, 85, 247)',
	'rgb(147, 51, 234)',
	'rgb(126, 34, 206)',
	'rgb(107, 33, 168)',
	'rgb(88, 28, 135)',

	'rgb(253, 244, 255)',
	'rgb(250, 232, 255)',
	'rgb(245, 208, 254)',
	'rgb(240, 171, 252)',
	'rgb(232, 121, 249)',
	'rgb(217, 70, 239)',
	'rgb(192, 38, 211)',
	'rgb(162, 28, 175)',
	'rgb(134, 25, 143)',
	'rgb(112, 26, 117)',

	'rgb(253, 242, 248)',
	'rgb(252, 231, 243)',
	'rgb(251, 207, 232)',
	'rgb(249, 168, 212)',
	'rgb(244, 114, 182)',
	'rgb(236, 72, 153)',
	'rgb(219, 39, 119)',
	'rgb(190, 24, 93)',
	'rgb(157, 23, 77)',
	'rgb(131, 24, 67)',

	'rgb(255, 241, 242)',
	'rgb(255, 228, 230)',
	'rgb(254, 205, 211)',
	'rgb(253, 164, 175)',
	'rgb(251, 113, 133)',
	'rgb(244, 63, 94)',
	'rgb(225, 29, 72)',
	'rgb(190, 18, 60)',
	'rgb(159, 18, 57)',
	'rgb(136, 19, 51)'
]

export const emojies = [
	// Fruits
	'🍏',
	'🍎',
	'🍐',
	'🍊',
	'🍋',
	'🍌',
	'🍉',
	'🍇',
	'🍓',
	'🫐',
	'🍈',
	'🍒',
	'🍑',
	'🥭',
	'🍍',
	'🥥',
	'🥝',

	// Vegetables
	'🍅',
	'🍆',
	'🥑',
	'🥦',
	'🥬',
	'🥒',
	'🌶',
	'🫑',
	'🌽',
	'🥕',
	'🥔',
	'🧄',
	'🧅',
	'🍄',

	// Breads & Bakery
	'🍞',
	'🥖',
	'🥨',
	'🥐',
	'🥯',

	// Dairy & Eggs
	'🧀',
	'🥚',
	'🍳',
	'🥞',
	'🧇',

	// Meats
	'🥓',
	'🥩',
	'🍗',
	'🍖',

	// Fast Foods
	'🌭',
	'🍔',
	'🍟',
	'🍕',

	// Wraps, Sandwiches & Ethnic Foods
	'🥪',
	'🌮',
	'🌯',
	'🫔',
	'🥙',
	'🧆',

	// Pasta, Rice & Asian Foods
	'🍜',
	'🍝',
	'🍣',
	'🍤',
	'🍙',
	'🍚',
	'🍛',
	'🍲',
	'🥘',
	'🥗',

	// Snacks & Misc
	'🍿',
	'🧈',
	'🥫',
	'🍱',
	'🥮',
	'🍠',
	'🍥',
	'🥟',
	'🥠',
	'🥡',

	// Desserts & Sweets
	'🍦',
	'🍧',
	'🍨',
	'🍩',
	'🍪',
	'🧁',
	'🍰',
	'🎂',
	'🍮',
	'🍭',
	'🍬',
	'🍫',
	'🍯',

	// Nuts
	'🥜',
	'🌰',

	// Drinks
	'🥛',
	'🧃',
	'🧉',
	'🥤',
	'🍶',
	'🍵',
	'🍺',
	'🍻',
	'🥂',
	'🍷',
	'🍸',
	'🍹',
	'🥃',
	'🍾',
	'☕️',
	'🫖',

	// Utensils & Condiments
	'🥄',
	'🍴',
	'🍽',
	'🥢',
	'🧂',

	// Shopping & Payment
	'🛒',
	'🛍️',
	'🧺',
	'💳',
	'💸',
	'💵',
	'💰',
	'💲',
	'🧾',
	'🔖',
	'🏪',
	'🏬',
	'🏦',
	'🏧',
	'📦',
	'📮',
	'🏷️',

	// Organizational / Utility
	'✅',
	'📋',
	'📜',
	'✏️',
	'📝',
	'🔍',
	'📆',
	'⏰',
	'📱',
	'💻',
	'🌐',
	'🔗',
	'🔒',
	'🔑',
	'🗃️',
	'🗂️',
	'🔄',
	'💡',
	'⭐️',
	'📌',
	'📍',
	'📊',
	'💯',
	'🎉',
	'🎊',
	'🎁',
	'🏆',
	'⚖️',
	'🏠',

	// Transportation & Movement (for shopping trips)
	'🚗',
	'🏃‍♂️',
	'🏃‍♀️',
	'🚶‍♂️',
	'🚶‍♀️',

	// Clothing (Items to buy)
	'👕',
	'👖',
	'👗',
	'👔',
	'🩳',
	'👠',
	'👟',
	'🧥',
	'🧤',
	'🧣',
	'🧦',
	'🎒',
	'👜',
	'👛',
	'👓',
	'🕶️',
	'👒',

	// Household Items (Things you might add to a shopping list)
	'🪣',
	'🪑',
	'🛋️',
	'🚪',
	'🪟',
	'🏺',
	'🖼️',
	'📺',
	'📻',
	'🔌',
	'🧴',
	'🪥',
	'🧹',
	'🧽',
	'🗑️',
	'🪒',
	'💊',
	'💉',
	'🩹',
	'❤️',
	'💔',
	'💘',
	'💙',
	'💚',
	'💛',
	'💜'
]
