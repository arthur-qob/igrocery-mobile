import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Platform, StyleSheet, View, Text, PlatformColor } from 'react-native'
import { HapticTab } from '../HapticTab'
import { BlurTint, BlurView } from 'expo-blur'
import { useTheme } from '@/contexts/ThemeContext'
import { useColors } from '@/constants/Colors'
import IconSymbol from '@/components/ui/IconSymbol'

const TabBar: React.FC<BottomTabBarProps> = ({
	state,
	descriptors,
	navigation
}) => {
	const { currentTheme } = useTheme()
	const contrastTheme = currentTheme === 'light' ? 'dark' : 'light'

	const { themedColors, staticColors } = useColors()

	const styles = StyleSheet.create({
		boxShadow: {
			position: 'absolute',
			top: Platform.OS === 'ios' ? '88%' : '90%',
			height: 75,
			width: '95%',
			alignSelf: 'center',
			// borderRadius: currentTheme !== 'light' ? 10 : 0,
			borderRadius: 10,
			// borderCurve: currentTheme !== 'light' ? 'continuous' : undefined,
			borderCurve: 'continuous',
			shadowColor: 'rgb(0, 0, 0)',
			shadowOffset: { width: 0, height: 7 },
			shadowOpacity: 0.2,
			shadowRadius: 10,
			elevation: 10
		},
		tabBar: {
			height: 75,
			overflow: 'hidden',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-around',
			alignItems: 'center',
			backgroundColor:
				Platform.OS === 'ios' ? 'transparent' : themedColors.panel,
			// borderRadius: currentTheme !== 'light' ? 10 : 0,
			borderRadius: 10,
			// borderCurve: currentTheme !== 'light' ? 'continuous' : undefined,
			borderCurve: 'continuous'
		}
	})

	return (
		// return currentTheme === 'light' ? (
		<View style={styles.boxShadow}>
			<BlurView
				tint={
					Platform.OS === 'android'
						? (`systemChromeMaterial${currentTheme.replace(currentTheme.charAt(0), currentTheme.charAt(0).toUpperCase())}` as BlurTint)
						: (`systemChromeMaterial${currentTheme.replace(currentTheme.charAt(0), currentTheme.charAt(0).toUpperCase())}` as BlurTint)
				}
				intensity={100}
				experimentalBlurMethod='dimezisBlurView'
				style={styles.tabBar}>
				{state.routes.map((route, index) => {
					const { options } = descriptors[route.key]
					const label =
						options.tabBarLabel !== undefined
							? options.tabBarLabel
							: options.title !== undefined
								? options.title
								: route.name
					const isFocused = state.index === index
					const icons = [
						`${isFocused ? 'house.fill' : 'house'}`,
						'gear'
					]
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
							color: isFocused
								? themedColors.text
								: themedColors.inactiveColor,
							justifyContent: 'center',
							alignItems: 'center',
							gap: 10
						}
					})
					return (
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
							<IconSymbol
								name={icons[index] as any}
								color={
									(isFocused
										? themedColors.text
										: themedColors.inactiveColor) as any
								}
								size={25}
							/>
							<Text style={styles2.labels}>
								{label as string}
							</Text>
						</HapticTab>
					)
				})}
			</BlurView>
		</View>
	)
}

export default TabBar
