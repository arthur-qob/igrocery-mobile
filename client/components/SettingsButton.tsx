import { Href, useRouter } from 'expo-router'
import React from 'react'
import {
	StyleProp,
	StyleSheet,
	TextStyle,
	TouchableOpacity,
	View,
	ViewStyle
} from 'react-native'
import IconSymbol from './ui/IconSymbol'
import { useColors } from '@/constants/Colors'

interface SettingsButtonProps {
	href?: Href
	content?: React.ReactNode
	style?: StyleProp<ViewStyle>
}

const SettingsButton: React.FC<SettingsButtonProps> = ({
	href,
	content,
	style
}) => {
	const router = useRouter()

	const { themedColors, staticColors } = useColors()

	const styles = StyleSheet.create({
		button: {
			width: '100%',
			padding: 20,
			borderRadius: 10,
			backgroundColor: themedColors.panel,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center'
		}
	})

	return (
		<TouchableOpacity
			style={[styles.button, style]}
			onPress={() => href && router.push(href)}>
			<View>{content}</View>
			<IconSymbol
				name='chevron.right'
				size={20}
				color={themedColors.separator}
				style={{ alignSelf: 'flex-end' }}
			/>
		</TouchableOpacity>
	)
}

export default SettingsButton
