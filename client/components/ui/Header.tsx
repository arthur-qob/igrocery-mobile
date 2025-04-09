import { BlurTint, BlurView } from 'expo-blur'
import React from 'react'
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { getHeaderTitle } from '@react-navigation/elements'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from '../ThemedText'
import { useTheme } from '@/contexts/ThemeContext'
import IconSymbol from '@/components/ui/IconSymbol'
import { useColors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

const Header: React.FC<BottomTabHeaderProps | any> = ({ options, route }) => {
	const { currentTheme } = useTheme()
	const contrastTheme = currentTheme === 'light' ? 'dark' : 'light'

	const { themedColors, staticColors } = useColors()

	const router = useRouter()

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
			backgroundColor:
				Platform.OS === 'ios' ? 'transparent' : themedColors.panel
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

	const HeaderBlurIntensity = Platform.OS === 'android' ? 0 : 50
	return (
		<BlurView
			tint={
				Platform.OS === 'ios'
					? (`systemChromeMaterial${currentTheme.replace(currentTheme.charAt(0), currentTheme.charAt(0).toUpperCase())}` as BlurTint)
					: undefined
			}
			intensity={HeaderBlurIntensity}
			experimentalBlurMethod='dimezisBlurView'
			style={styles.tabHeader}>
			<View style={styles.headerButtons}>
				{/* Header-Left */}
				<View style={{ alignSelf: 'flex-start' }}></View>

				{/* Header-Right */}
				{title === 'Lists' && (
					<TouchableOpacity
						onPress={() => router.push('/(main)/list/new')}
						style={{ alignSelf: 'flex-end' }}>
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

export default Header
