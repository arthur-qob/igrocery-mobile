import { BlurTint, BlurView } from 'expo-blur'
import React from 'react'
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { getHeaderTitle } from '@react-navigation/elements'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from '../ThemedText'
import { useTheme } from '@/contexts/ThemeContext'
import IconSymbol from '@/components/ui/IconSymbol'
import { useColors } from '@/constants/Colors'

const TabBarHeader: React.FC<BottomTabHeaderProps> = ({ options, route }) => {
	const { currentTheme } = useTheme()
	const contrastTheme = currentTheme === 'light' ? 'dark' : 'light'

	const { themedColors, staticColors } = useColors()

	const title = getHeaderTitle(options, route.key)

	const styles = StyleSheet.create({
		tabHeader: {
			flex: 1,
			height: 150,
			paddingHorizontal: 20,
			paddingTop: 35,
			flexDirection: 'column',
			...StyleSheet.absoluteFillObject,
			overflow: 'hidden',
			backgroundColor: 'transparent'
		},
		headerButtons: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			paddingVertical: 20
		},
		titleContainer: { flex: 1, justifyContent: 'flex-end' },
		title: {
			alignSelf: 'flex-start',
			fontSize: 35,
			fontWeight: 'bold'
		}
	})

	const tabBarHeaderBlurIntensity = Platform.OS === 'android' ? 10 : 50
	return (
		<BlurView
			tint={
				Platform.OS === 'android'
					? (`systemChromeMaterial${contrastTheme.replace(contrastTheme.charAt(0), contrastTheme.charAt(0).toUpperCase())}` as BlurTint)
					: (`systemChromeMaterial${currentTheme.replace(currentTheme.charAt(0), currentTheme.charAt(0).toUpperCase())}` as BlurTint)
			}
			intensity={tabBarHeaderBlurIntensity}
			experimentalBlurMethod='dimezisBlurView'
			style={styles.tabHeader}>
			<View style={styles.headerButtons}>
				{/* Header-Left */}
				<View style={{ alignSelf: 'flex-start' }}></View>

				{/* Header-Right */}
				{title === 'Home' && (
					<TouchableOpacity style={{ alignSelf: 'flex-end' }}>
						<IconSymbol
							name='plus'
							color={staticColors.tintColor as any}
						/>
					</TouchableOpacity>
				)}
			</View>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>{title}</Text>
			</View>
		</BlurView>
	)
}

export default TabBarHeader
