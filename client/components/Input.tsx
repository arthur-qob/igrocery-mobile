import React, { useState } from 'react'
import {
	TextInput as RNTextInput,
	TextInputProps as RNTextInputProps,
	View,
	ViewStyle,
	TextStyle,
	TouchableOpacity,
	StyleSheet,
	DimensionValue
} from 'react-native'
import { useTheme } from '@/contexts/ThemeContext'
import { useColors, Colors } from '@/constants/Colors'
import IconSymbol from '@/components/ui/IconSymbol'
import { Text } from './ThemedText'

type InputType = 'text' | 'password' | 'email' | 'number'
type InputVariant = 'default' | 'filled' | 'outlined' | 'ghost' | 'clean'
type InputSize = 'sm' | 'md' | 'lg'

interface InputProps extends Omit<RNTextInputProps, 'style'> {
	label?: string
	error?: string
	type?: InputType
	variant?: InputVariant
	size?: InputSize
	width?: number | string
	disabled?: boolean
	loading?: boolean
	onValueChange?: (val: string) => void
	value?: string
	inputStyle?: TextStyle
	containerStyle?: ViewStyle
	useContrastColors?: boolean
	useHighlightedPlaceholder?: boolean
}

export const Input: React.FC<InputProps> = ({
	label,
	error,
	type = 'text',
	variant = 'default',
	size = 'md',
	width = '100%',
	inputStyle,
	containerStyle,
	disabled = false,
	loading = false,
	onValueChange,
	value,
	useContrastColors = false,
	useHighlightedPlaceholder = false,
	...props
}) => {
	const { currentTheme } = useTheme()
	const { themedColors, staticColors } = useColors()
	const contrastTheme = currentTheme === 'light' ? 'dark' : 'light'

	const [isFocused, setIsFocused] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const sizeStyles: Record<
		InputSize,
		{ height?: number; fontSize: number; padding: number }
	> = {
		sm: { fontSize: 14, padding: 8 },
		md: { height: 50, fontSize: 16, padding: 14 },
		lg: { height: 55, fontSize: 20, padding: 16 }
	}

	const getVariantStyle = (): ViewStyle => {
		switch (variant) {
			case 'outlined':
				return {
					borderWidth: 1,
					borderColor: error
						? staticColors.danger
						: Colors[
								useContrastColors ? contrastTheme : currentTheme
							].border,
					borderRadius: 10
				}
			case 'clean':
				return {
					borderBottomWidth: 1,
					borderBottomColor: error
						? staticColors.danger
						: Colors[
								useContrastColors ? contrastTheme : currentTheme
							].border,
					backgroundColor: 'transparent'
				}
			case 'ghost':
				return {
					backgroundColor: themedColors.ghost,
					borderRadius: 10
				}
			case 'filled':
				return {
					backgroundColor:
						Colors[useContrastColors ? contrastTheme : currentTheme]
							.background,
					borderRadius: 10
				}
			default:
				return {
					borderWidth: 1,
					borderColor: error
						? staticColors.danger
						: Colors[
								useContrastColors ? contrastTheme : currentTheme
							].border,
					borderRadius: 10
				}
		}
	}

	const getTextColor = () => {
		return disabled ? themedColors.inactiveColor : themedColors.text
	}

	const highlightedPlaceholderStyle = isFocused ? 'gray' : getTextColor()

	return (
		<View style={[{ width: width as DimensionValue }, containerStyle]}>
			{label && <Text style={styles.label}>{label}</Text>}
			<View
				style={[
					getVariantStyle(),
					{
						flexDirection: 'row',
						alignItems: 'center'
					},
					disabled && styles.disabled
				]}>
				<RNTextInput
					style={[
						{
							flex: 1,
							height: sizeStyles[size].height,
							fontSize: sizeStyles[size].fontSize,
							padding:
								variant === 'clean'
									? 0
									: sizeStyles[size].padding,
							color: getTextColor()
						},
						inputStyle
					]}
					value={value}
					onChangeText={onValueChange}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					placeholderTextColor={
						error
							? staticColors.danger
							: useHighlightedPlaceholder
								? highlightedPlaceholderStyle
								: undefined
					}
					editable={!disabled}
					placeholder={props.placeholder}
					secureTextEntry={type === 'password' && !showPassword}
					autoCapitalize={type === 'email' ? 'none' : 'sentences'}
					keyboardType={type === 'number' ? 'numeric' : 'default'}
					{...props}
				/>
				{type === 'password' && (
					<TouchableOpacity
						onPress={() => setShowPassword((prev) => !prev)}>
						<IconSymbol
							name={showPassword ? 'eye' : 'eye.slash'}
							color={error ? staticColors.danger : getTextColor()}
							size={20}
						/>
					</TouchableOpacity>
				)}
			</View>
			{error && <Text style={styles.error}>{error}</Text>}
		</View>
	)
}

const styles = StyleSheet.create({
	label: {
		marginBottom: 4
	},
	error: {
		color: '#ef4444',
		marginTop: 4
	},
	disabled: {
		opacity: 0.5
	}
})
