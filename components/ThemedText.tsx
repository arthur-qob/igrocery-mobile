import { Colors } from '@/constants/Colors'
import { useTheme } from '@/contexts/ThemeContext'
import React from 'react'
import {
	Text,
	type TextProps,
	StyleSheet,
	PlatformColor,
	Platform,
	StyleProp,
	TextStyle,
} from 'react-native'

export type ThemedTextProps = TextProps & {
	contrast?: boolean
	style?: TextProps['style']
	type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link'
}

const ThemedText: React.FC<ThemedTextProps> = ({
	contrast = false,
	style,
	type = 'default',
	...rest
}) => {
	const { currentTheme } = useTheme()
	const contrastThemeColor = currentTheme === 'dark' ? 'light' : 'dark'

	const styles = StyleSheet.create({
		default: {
			fontSize: 16,
		},
		defaultSemiBold: {
			fontSize: 16,
			fontWeight: '600',
		},
		title: {
			fontSize: 32,
			fontWeight: 'bold',
		},
		subtitle: {
			fontSize: 20,
			fontWeight: 'bold',
		},
		link: {
			fontSize: 16,
			color: '#0a7ea4',
		},
	})

	return (
		<Text
			style={[
				{
					color: !contrast
						? Platform.OS === 'ios'
							? PlatformColor('label')
							: Colors[currentTheme as keyof typeof Colors].text
						: Colors[contrastThemeColor as keyof typeof Colors]
								.text,
				},
				type === 'default' ? styles.default : undefined,
				type === 'title' ? styles.title : undefined,
				type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
				type === 'subtitle' ? styles.subtitle : undefined,
				type === 'link' ? styles.link : undefined,
				style,
			]}
			{...rest}
		/>
	)
}

export { ThemedText as Text }
