import { useTheme } from '@/contexts/ThemeContext'
import React, { useState } from 'react'
import {
	DimensionValue,
	Platform,
	PlatformColor,
	StyleSheet,
	TextStyle,
	ViewStyle,
	TextInput,
	TextInputProps as RNTextInputProps,
	View,
	TouchableOpacity
} from 'react-native'
import { useColors, Colors } from '@/constants/Colors'
import IconSymbol from '@/components/ui/IconSymbol'
import { opacity } from 'react-native-reanimated/lib/typescript/Colors'

type InputType = 'text' | 'password' | 'email' | 'number'

type InputVariants = 'default' | 'outlined' | 'clean' | 'ghost'

type InputSize = 'sm' | 'md' | 'lg'

interface InputProps extends Omit<RNTextInputProps, 'style'> {
	type?: InputType
	variant?: InputVariants
	placeholder?: string
	size?: InputSize
	width?: number | string
	disabled?: boolean
	loading?: boolean
	withErrors?: boolean
	onValueChange?: (param?: any) => any
	value?: string
	children?: React.ReactNode
	inputStyle?: RNTextInputProps['style']
	containerStyle?: ViewStyle
	useContrastColors?: boolean
	useHighlightedPlaceholder?: boolean
}

const Input: React.FC<InputProps> = ({
	placeholder,
	type = 'text',
	variant = 'default',
	size = 'md',
	width = '100%',
	inputStyle,
	containerStyle,
	disabled = false,
	loading = false,
	withErrors,
	onValueChange,
	value,
	children,
	useContrastColors = false,
	useHighlightedPlaceholder = false,
	...otherProps
}) => {
	const { currentTheme } = useTheme()
	const contrastTheme = currentTheme === 'light' ? 'dark' : 'light'

	const { themedColors, staticColors } = useColors()

	const sizeStyles: Record<
		InputSize,
		{ height?: number; fontSize: number; padding: number }
	> = {
		sm: { fontSize: 12, padding: 8 },
		md: { height: 25, fontSize: 16, padding: 14 },
		lg: { height: 55, fontSize: 20, padding: 16 }
	}

	const getVariantStyle = () => {
		switch (variant) {
			case 'default':
				return {
					borderWidth: withErrors ? 2 : 1
				}
			case 'outlined':
				return {
					borderWidth: withErrors ? 2 : 1,
					borderRadius: 10,
					borderColor: withErrors
						? staticColors.danger
						: Colors[
								useContrastColors ? contrastTheme : currentTheme
							].border
				}
			case 'clean':
				return {
					backgroundColor: 'transparent',
					borderBottomWidth: withErrors ? 2 : 1,
					borderBottomColor: withErrors
						? Colors.danger
						: Colors[
								useContrastColors ? contrastTheme : currentTheme
							].border
				}
			case 'ghost':
				return {
					backgroundColor: themedColors.ghost,
					borderRadius: 10
				}
		}
	}

	const getTextColor = () => {
		if (disabled) {
			return themedColors.inactiveColor
		}

		return themedColors.text
	}

	const [isFocused, setIsFocused] = useState(false)

	const styles = StyleSheet.create({
		InputContainer: {
			marginBottom: 16,
			width: width as DimensionValue,
			position: 'relative'
		},
		error: {
			color: staticColors.danger,
			marginTop: 4
		},
		disabled: {
			opacity: 0.5
		}
	})

	const [showPassword, setShowPassword] = useState(false)

	const handleShowPassword = () => {
		setShowPassword((prev) => !prev)
	}

	const highlightedPlaceholderStyle = isFocused
		? Platform.OS === 'ios'
			? PlatformColor('systemGray3')
			: 'gray'
		: getTextColor()

	return (
		<View style={[styles.InputContainer, containerStyle]}>
			<View
				style={[
					getVariantStyle(),
					{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingVertical: 5
					},
					disabled && styles.disabled
				]}>
				<TextInput
					style={[
						{
							height: sizeStyles[size].height,
							fontSize: sizeStyles[size].fontSize,
							padding:
								variant === 'clean'
									? 0
									: sizeStyles[size].padding,
							color: getTextColor(),
							width: '90%'
						},
						inputStyle
					]}
					onChangeText={onValueChange}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					value={value}
					placeholder={placeholder}
					placeholderTextColor={
						withErrors
							? staticColors.danger
							: useHighlightedPlaceholder
								? highlightedPlaceholderStyle
								: undefined
					}
					editable={!disabled}
					secureTextEntry={type === 'password' && !showPassword}
					keyboardType={
						type === 'email' ? 'email-address' : 'default'
					}
					autoCapitalize={type === 'email' ? 'none' : undefined}
					{...otherProps}
				/>
				{type === 'password' && (
					<TouchableOpacity
						onPress={handleShowPassword}
						style={{ width: '10%', alignItems: 'center' }}>
						<IconSymbol
							name={showPassword ? 'eye' : 'eye.slash'}
							color={
								withErrors
									? staticColors.danger
									: getTextColor()
							}
							size={24}
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	)
}

export { Input }
