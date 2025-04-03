import { BlurTint, BlurView } from 'expo-blur'
import React from 'react'
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { getHeaderTitle } from '@react-navigation/elements'
import { Platform, StyleSheet } from 'react-native'
import { Text } from '../ThemedText'
import { useTheme } from '@/contexts/ThemeContext'

const TabBarHeader: React.FC<BottomTabHeaderProps> = ({ options, route }) => {
	const { currentTheme } = useTheme()

	const title = getHeaderTitle(options, route.key)

	const styles = StyleSheet.create({
		tabHeader: {
			flex: 1,
			height: 150,
			paddingHorizontal: 20,
			flexDirection: 'row'
		},
		title: {
			alignSelf: 'flex-end',
			fontSize: 35,
			fontWeight: 'bold'
		}
	})

	return (
		<BlurView
			tint={
				Platform.OS === 'android'
					? (`systemChromeMaterial${currentTheme.replace(currentTheme.charAt(0), currentTheme.charAt(0).toUpperCase())}` as BlurTint)
					: undefined
			}
			intensity={50}
			experimentalBlurMethod='dimezisBlurView'
			style={{
				...StyleSheet.absoluteFillObject,
				overflow: 'hidden',
				backgroundColor: 'transparent',
				...styles.tabHeader
			}}>
			<Text style={styles.title}>{title}</Text>
		</BlurView>
	)
}

export default TabBarHeader
