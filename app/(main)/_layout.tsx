import { Tabs } from 'expo-router'
import { BlurView } from 'expo-blur'
import { Platform, StyleSheet } from 'react-native'
import { useTheme } from '@/contexts/ThemeContext'

export default function MainLayout() {
	const { currentTheme } = useTheme()
	return (
		<Tabs
			screenOptions={{
				tabBarBackground: () => (
					<BlurView
						tint={
							Platform.OS === 'ios'
								? 'systemChromeMaterial'
								: (currentTheme as any)
						}
						intensity={100}
						style={StyleSheet.absoluteFill}
					/>
				),
			}}>
			<Tabs.Screen name='index' />
			<Tabs.Screen name='settings' />
		</Tabs>
	)
}
