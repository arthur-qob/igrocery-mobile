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
export const backgroundColors = [
	'#fef2f2',
	'#fee2e2',
	'#fecaca',
	'#fca5a5',
	'#f87171',
	'#ef4444',
	'#dc2626',
	'#b91c1c',
	'#991b1b',
	'#7f1d1d',

	'#fff7ed',
	'#ffedd5',
	'#fed7aa',
	'#fdba74',
	'#fb923c',
	'#f97316',
	'#ea580c',
	'#c2410c',
	'#9a3412',
	'#7c2d12',

	'#fffbeb',
	'#fef3c7',
	'#fde68a',
	'#fcd34d',
	'#fbbf24',
	'#f59e0b',
	'#d97706',
	'#b45309',
	'#92400e',
	'#78350f',

	'#fefce8',
	'#fef9c3',
	'#fef08a',
	'#fde047',
	'#facc15',
	'#eab308',
	'#ca8a04',
	'#a16207',
	'#854d0e',
	'#713f12',

	'#f7fee7',
	'#ecfccb',
	'#d9f99d',
	'#bef264',
	'#a3e635',
	'#84cc16',
	'#65a30d',
	'#4d7c0f',
	'#3f6212',
	'#365314',

	'#f0fdf4',
	'#dcfce7',
	'#bbf7d0',
	'#86efac',
	'#4ade80',
	'#22c55e',
	'#16a34a',
	'#15803d',
	'#166534',
	'#14532d',

	'#ecfdf5',
	'#d1fae5',
	'#a7f3d0',
	'#6ee7b7',
	'#34d399',
	'#10b981',
	'#059669',
	'#047857',
	'#065f46',
	'#064e3b',

	'#f0fdfa',
	'#ccfbf1',
	'#99f6e4',
	'#5eead4',
	'#2dd4bf',
	'#14b8a6',
	'#0d9488',
	'#0f766e',
	'#115e59',
	'#134e4a',

	'#f0f9ff',
	'#e0f2fe',
	'#bae6fd',
	'#7dd3fc',
	'#38bdf8',
	'#0ea5e9',
	'#0284c7',
	'#0369a1',
	'#075985',
	'#0c4a6e',

	'#eff6ff',
	'#dbeafe',
	'#bfdbfe',
	'#93c5fd',
	'#60a5fa',
	'#3b82f6',
	'#2563eb',
	'#1d4ed8',
	'#1e40af',
	'#1e3a8a',

	'#eef2ff',
	'#e0e7ff',
	'#c7d2fe',
	'#a5b4fc',
	'#818cf8',
	'#6366f1',
	'#4f46e5',
	'#4338ca',
	'#3730a3',
	'#312e81',

	'#f5f3ff',
	'#ede9fe',
	'#ddd6fe',
	'#c4b5fd',
	'#a78bfa',
	'#8b5cf6',
	'#7c3aed',
	'#6d28d9',
	'#5b21b6',
	'#4c1d95',

	'#faf5ff',
	'#f3e8ff',
	'#e9d5ff',
	'#d8b4fe',
	'#c084fc',
	'#a855f7',
	'#9333ea',
	'#7e22ce',
	'#6b21a8',
	'#581c87',

	'#fdf4ff',
	'#fae8ff',
	'#f5d0fe',
	'#f0abfc',
	'#e879f9',
	'#d946ef',
	'#c026d3',
	'#a21caf',
	'#86198f',
	'#701a75',

	'#fdf2f8',
	'#fce7f3',
	'#fbcfe8',
	'#f9a8d4',
	'#f472b6',
	'#ec4899',
	'#db2777',
	'#be185d',
	'#9d174d',
	'#831843',

	'#fff1f2',
	'#ffe4e6',
	'#fecdd3',
	'#fda4af',
	'#fb7185',
	'#f43f5e',
	'#e11d48',
	'#be123c',
	'#9f1239',
	'#881337'
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
