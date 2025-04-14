import { useTheme } from '@/contexts/ThemeContext'
import React from 'react'
import {
	ActivityIndicator,
	DimensionValue,
	Platform,
	PlatformColor,
	Pressable,
	PressableProps,
	StyleSheet,
	TextStyle,
	View,
	ViewStyle
} from 'react-native'
import { Text } from './ThemedText'
import { useColors, Colors } from '@/constants/Colors'
import { SymbolView } from 'expo-symbols'
import Ionicons from '@expo/vector-icons/Ionicons'
import IconSymbol from './ui/IconSymbol'

type CustomButtonVariants =
	| 'filled'
	| 'danger'
	| 'outlined'
	| 'danger-outlined'
	| 'text'
	| 'danger-text'
	| 'icon-button'
	| 'icon-button-outlined'

type CustomButtonSize = 'sm' | 'md' | 'lg'

interface CustomButtonProps extends PressableProps {
	variant?: CustomButtonVariants
	title?: string
	icon?: string
	size?: CustomButtonSize
	width?: number | string
	style?: ViewStyle
	disabled?: boolean
	loading?: boolean
	onPress?: (param?: any) => any
	children?: React.ReactNode
	textStyle?: TextStyle
	useContrastColors?: boolean
}

const CustomButton: React.FC<CustomButtonProps> = ({
	variant = 'filled',
	icon = '',
	title = '',
	size = 'md',
	width = '100%',
	style,
	disabled = false,
	loading = false,
	onPress,
	children,
	textStyle,
	useContrastColors = false,
	...otherProps
}) => {
	const { currentTheme } = useTheme()
	const contrastTheme = currentTheme === 'light' ? 'dark' : 'light'

	const { themedColors, staticColors } = useColors()

	const sizeStyles: Record<
		CustomButtonSize,
		{ height: number; fontSize: number; padding: number }
	> = {
		sm: { height: 36, fontSize: 12, padding: 12 },
		md: { height: 44, fontSize: 16, padding: 16 },
		lg: { height: 55, fontSize: 20, padding: 20 }
	}

	const getVariantStyle = () => {
		const baseStyle: ViewStyle = {
			width: width as DimensionValue,
			borderWidth: 1,
			borderRadius: 10,
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center'
		}

		switch (variant) {
			case 'filled':
				return {
					...baseStyle,
					backgroundColor:
						currentTheme === 'dark'
							? 'rgb(255, 255, 255)'
							: 'rgb(24, 24, 24)',
					borderColor:
						currentTheme === 'dark'
							? 'rgb(255, 255, 255)'
							: 'rgb(24, 24, 24)'
				}
			case 'outlined':
				return {
					...baseStyle,
					backgroundColor: 'transparent',
					borderColor:
						currentTheme === 'dark'
							? 'rgb(255, 255, 255)'
							: 'rgb(24, 24, 24)'
				}
			case 'danger':
				return {
					...baseStyle,
					backgroundColor: staticColors.danger,
					borderColor:
						Platform.OS === 'ios'
							? PlatformColor('systemRed')
							: staticColors.danger
				}
			case 'danger-outlined':
				return {
					...baseStyle,
					backgroundColor: 'transparent',
					borderColor:
						Platform.OS === 'ios'
							? PlatformColor('systemRed')
							: staticColors.danger
				}
			case 'text':
				return {
					...baseStyle,
					backgroundColor: 'transparent',
					borderColor: 'transparent'
				}
			case 'danger-text':
				return {
					...baseStyle,
					backgroundColor: 'transparent',
					borderColor: 'transparent'
				}
			case 'icon-button':
				return {
					...baseStyle,
					backgroundColor: 'transparent',
					borderColor: 'transparent'
				}
			case 'icon-button-outlined':
				return {
					...baseStyle,
					backgroundColor: 'transparent',
					borderColor:
						currentTheme === 'dark'
							? 'rgb(255, 255, 255)'
							: 'rgb(24, 24, 24)'
				}
		}
	}

	const getTextColor = () => {
		switch (variant) {
			case 'filled':
				return Colors[contrastTheme].text
			case 'danger':
				return Colors[contrastTheme].text
			case 'outlined':
				return Colors[currentTheme].text
			case 'danger-outlined':
				staticColors.danger
			case 'text':
				return staticColors.tintColor
			case 'danger-text':
				return staticColors.danger
			case 'icon-button':
				return staticColors.tintColor
			case 'icon-button-outlined':
				return staticColors.tintColor
		}
	}

	const buttonContent = () => {
		if (loading) {
			return <ActivityIndicator color={getTextColor()} />
		} else if (variant.includes('icon')) {
			return (
				<View
					style={{
						width: '55%',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						alignSelf: 'center'
					}}>
					<IconSymbol
						name={icon}
						color={getTextColor()}
					/>
					<Text
						style={StyleSheet.flatten([
							{
								flex: 1,
								fontSize: sizeStyles[size].fontSize,
								color: getTextColor(),
								textAlign: 'center',
								margin: 0,
								fontWeight: '700'
							},
							textStyle
						])}>
						{title}
					</Text>
					{children}
				</View>
			)
		} else {
			return (
				<>
					<Text
						style={StyleSheet.flatten([
							{
								flex: 1,
								fontSize: sizeStyles[size].fontSize,
								color: getTextColor(),
								textAlign: 'center',
								margin: 0,
								fontWeight: '700'
							},
							textStyle
						])}>
						{title}
					</Text>
					{children}
				</>
			)
		}
	}

	return (
		<Pressable
			onPress={onPress}
			disabled={disabled || loading}
			style={StyleSheet.flatten([
				style,
				{
					...getVariantStyle(),
					height: sizeStyles[size].height,
					paddingHorizontal: sizeStyles[size].padding,
					opacity: disabled ? 0.5 : 1
				}
			])}>
			{buttonContent}
		</Pressable>
	)
}

export { CustomButton as Button }
