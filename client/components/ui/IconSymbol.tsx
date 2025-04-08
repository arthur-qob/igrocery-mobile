import Ionicons from '@expo/vector-icons/Ionicons'
import { AnimationSpec, SymbolType, SymbolView } from 'expo-symbols'
import React from 'react'
import { Platform } from 'react-native'
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
	'list.bullet': 'list'
}

type IconSymbolProps = {
	name: keyof typeof iconsMapping
	size?: number
	color?: string | null
	animationSpec?: AnimationSpec
	type?: SymbolType
}

const IconSymbol: React.FC<IconSymbolProps> = ({
	name,
	size = 28,
	color,
	animationSpec,
	type = 'monochrome'
}) => {
	// Remove `.fill` if it exists and fallback to the non-fill version
	const mappedName = iconsMapping[name]
	if (name && name.includes('gear.fill')) {
		name = name.replace('.fill', '')
	}

	return Platform.OS === 'ios' ? (
		<SymbolView
			name={name as import('expo-symbols').SymbolViewProps['name']}
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
			color={color as string}
			size={size}
		/>
	)
}

export default IconSymbol
