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
						intensity={50}
						experimentalBlurMethod='dimezisBlurView'
						style={{
							...StyleSheet.absoluteFillObject,
							overflow: 'hidden',
							backgroundColor: 'transparent'
						}}
					/>
				)
			}}>
			<Tabs.Screen name='index' />
			<Tabs.Screen name='settings' />
		</Tabs>
	)
}
