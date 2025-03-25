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
	TouchableOpacity,
} from 'react-native'
import { Colors } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'

type InputType = 'text' | 'password' | 'email' | 'number'

type InputVariants = 'default' | 'outlined' | 'clean'

type InputSize = 'sm' | 'md' | 'lg'

interface InputProps extends Omit<RNTextInputProps, 'style'> {
	type?: InputType
	variant?: InputVariants
	placeholder?: string
	size?: InputSize
	width?: number | string
	disabled?: boolean
	loading?: boolean
	onValueChange?: (param?: any) => any
	value?: string
	children?: React.ReactNode
	inputStyle?: TextStyle
	containerStyle?: ViewStyle
	useContrastColors?: boolean
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
	onValueChange,
	value,
	children,
	useContrastColors = false,
	...otherProps
}) => {
	const { currentTheme } = useTheme()
	const contrastTheme = currentTheme === 'light' ? 'dark' : 'light'

	if (Platform.OS === 'ios') {
		var { SymbolView } = require('expo-symbols')
	}

	const sizeStyles: Record<
		InputSize,
		{ height?: number; fontSize: number; padding: number }
	> = {
		sm: { fontSize: 16, padding: 8 },
		md: { height: 25, fontSize: 20, padding: 14 },
		lg: { height: 55, fontSize: 32, padding: 16 },
	}

	const getVariantStyle = () => {
		switch (variant) {
			case 'default':
				return {
					borderWidth: 1,
				}
			case 'outlined':
				return {
					borderWidth: 1,
					borderRadius: 10,
					borderColor:
						Colors[useContrastColors ? contrastTheme : currentTheme]
							.border,
				}
			case 'clean':
				return {
					backgroundColor: 'transparent',
					borderBottomWidth: 1,
					borderBottomColor:
						Colors[useContrastColors ? contrastTheme : currentTheme]
							.border,
				}
		}
	}

	const getTextColor = () => {
		if (disabled) {
			return Platform.OS === 'ios' ? PlatformColor('systemGray3') : 'gray'
		}

		return Platform.OS === 'ios'
			? PlatformColor('label')
			: Colors[useContrastColors ? contrastTheme : currentTheme].text
	}

	const [isFocused, setIsFocused] = useState(false)

	const styles = StyleSheet.create({
		InputContainer: {
			marginBottom: 16,
			width: width as DimensionValue,
			position: 'relative',
		},
		error: {
			color: Platform.OS === 'ios' ? PlatformColor('systemRed') : 'red',
			marginTop: 4,
		},
		disabled: {
			opacity: 0.5,
		},
	})

	const [showPassword, setShowPassword] = useState(false)

	const handleShowPassword = () => {
		setShowPassword((prev) => !prev)
	}

	return (
		<View style={[styles.InputContainer, containerStyle]}>
			<View
				style={[
					getVariantStyle(),
					{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					},
					disabled && styles.disabled,
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
							width: '90%',
						},
						inputStyle,
					]}
					onChangeText={onValueChange}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					value={value}
					placeholder={placeholder}
					placeholderTextColor={
						isFocused
							? Platform.OS === 'ios'
								? PlatformColor('systemGray3')
								: 'gray'
							: getTextColor()
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
						{Platform.OS === 'ios' ? (
							<SymbolView
								name={showPassword ? 'eye' : 'eye.slash'}
								tintColor={getTextColor()}
							/>
						) : (
							<Ionicons
								name={showPassword ? 'eye' : 'eye-off'}
								color={getTextColor()}
								size={24}
							/>
						)}
					</TouchableOpacity>
				)}
			</View>
		</View>
	)
}

export { Input }
