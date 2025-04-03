import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Platform, StyleSheet, View, Text, PlatformColor } from 'react-native'
import { HapticTab } from '../HapticTab'
import { BlurTint, BlurView } from 'expo-blur'
import { useTheme } from '@/contexts/ThemeContext'
import { Colors } from '@/constants/Colors'

const TabBar: React.FC<BottomTabBarProps> = ({
	state,
	descriptors,
	navigation
}) => {
	const { currentTheme } = useTheme()
	const contrastTheme = currentTheme === 'light' ? 'dark' : 'light'

	const styles = StyleSheet.create({
		tabBar: {
			position: 'absolute',
			top: '88%',
			height: 75,
			marginHorizontal: 20,
			borderRadius: 10,
			borderCurve: 'continuous',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-around',
			alignItems: 'center'
		}
	})

	return (
		<BlurView
			tint={
				Platform.OS === 'android'
					? (`systemChromeMaterial${contrastTheme.replace(contrastTheme.charAt(0), contrastTheme.charAt(0).toUpperCase())}` as BlurTint)
					: undefined
			}
			intensity={Platform.OS === 'android' ? 10 : 50}
			experimentalBlurMethod='dimezisBlurView'
			style={{
				...StyleSheet.absoluteFillObject,
				overflow: 'hidden',
				backgroundColor: 'transparent',
				...styles.tabBar
			}}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key]
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
							? options.title
							: route.name

				const isFocused = state.index === index

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true
					})

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params)
					}
				}

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key
					})
				}

				const styles2 = StyleSheet.create({
					labels: {
						fontSize: 15,
						color: Platform.select({
							ios: isFocused
								? PlatformColor('label')
								: PlatformColor('systemGray'),
							default: isFocused
								? Colors[currentTheme].inactiveColor
								: Colors[currentTheme].inactiveColor
						})
					}
				})

				return (
					<View>
						{/* Icons here */}
						<HapticTab
							key={index}
							accessibilityRole='button'
							accessibilityState={
								isFocused ? { selected: true } : {}
							}
							accessibilityLabel={
								options.tabBarAccessibilityLabel
							}
							testID={options.tabBarButtonTestID}
							onPress={onPress}
							onLongPress={onLongPress}
							style={{
								justifyContent: 'center',
								alignItems: 'center'
							}}>
							<>{}</>
							<Text style={styles2.labels}>
								{label as string}
							</Text>
						</HapticTab>
					</View>
				)
			})}
		</BlurView>
	)
}

export default TabBar
