import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import IconSymbol, { IconSymbolProps } from './IconSymbol'
import {
	colors as backgroundColors,
	emojies,
	useColors
} from '@/constants/Colors'
import { SymbolView } from 'expo-symbols'
import { useMemo } from 'react'

type IconCircleProps = {
	emoji?: string
	iconName?: string
	style?: ViewStyle
	size?: number
	backgroundColor?: string
}
const IconCircle: React.FC<IconCircleProps> = ({
	emoji,
	iconName,
	style,
	backgroundColor = 'lightblue',
	size = 60
}) => {
	const { themedColors } = useColors()

	if (!emoji && !iconName)
		throw new Error(
			'IconCircle must have either an emoji or an iconName set.'
		)

	const randomEmoji = useMemo(
		() => emojies[Math.floor(Math.random() * emojies.length)],
		[]
	)

	const randomBgColor =
		backgroundColors[Math.floor(Math.random() * backgroundColors.length)]

	const styles = StyleSheet.create({
		iconCircleView: {
			alignSelf: 'center',
			backgroundColor: backgroundColor || randomBgColor,
			width: size,
			height: size,
			borderRadius: 10,
			justifyContent: 'center',
			alignItems: 'center',
			...style
		}
	})

	return (
		<View style={styles.iconCircleView}>
			{emoji && (
				<Text style={{ fontSize: size / 1.5 }}>
					{emoji || randomEmoji}
				</Text>
			)}
			{iconName && (
				<IconSymbol
					name={iconName}
					size={50}
					color={themedColors.text}
				/>
			)}
		</View>
	)
}

export default IconCircle
