import Ionicons from '@expo/vector-icons/Ionicons'
import { AnimationSpec, SymbolType, SymbolView } from 'expo-symbols'
import React from 'react'
import { Platform, StyleProp, TextStyle, ViewStyle } from 'react-native'
import toHex from '../../scripts/toHex'

const iconsMapping: Partial<
	Record<
		import('expo-symbols').SymbolViewProps['name'] | string,
		React.ComponentProps<typeof Ionicons>['name']
	>
> = {
	eye: 'eye',
	'eye.slash': 'eye-off',
	exclamationmark: 'alert',
	'person.circle': 'person-circle-outline',
	'person.circle.fill': 'person-circle',
	plus: 'add',
	gear: 'settings-outline',
	'gear.fill': 'settings',
	house: 'home-outline',
	'house.fill': 'home',
	'chevron.right': 'chevron-forward',
	'chevron.down': 'chevron-down',
	'list.bullet': 'list',
	'person.2.fill': 'people',
	'checkmark.circle': 'checkmark-circle-outline',
	checkmark: 'checkmark',
	'xmark.circle': 'close-circle-outline',
	cart: 'cart-outline',
	'cart.fill': 'cart',
	'trash.fill': 'trash',
	'square.and.pencil': 'create-outline'
}

export type IconSymbolProps = {
	name: keyof typeof iconsMapping
	size?: number
	color?: string | null
	animationSpec?: AnimationSpec
	type?: SymbolType
	style?: StyleProp<ViewStyle | TextStyle>
}

const IconSymbol: React.FC<IconSymbolProps> = ({
	name,
	size = 28,
	color,
	animationSpec,
	type,
	style
}) => {
	// Remove `.fill` if it exists and fallback to the non-fill version
	const mappedName = iconsMapping[name]
	if (name && name.includes('gear.fill')) {
		name = name.replace('.fill', '')
	}

	return Platform.OS === 'ios' ? (
		<SymbolView
			name={name as import('expo-symbols').SymbolViewProps['name']}
			style={style as ViewStyle}
			tintColor={
				toHex(
					color
				) as import('expo-symbols').SymbolViewProps['tintColor']
			}
			size={size}
			type={type}
			animationSpec={animationSpec}
		/>
	) : (
		<Ionicons
			name={mappedName}
			style={style as TextStyle}
			color={color as string}
			size={size}
		/>
	)
}

export default IconSymbol
