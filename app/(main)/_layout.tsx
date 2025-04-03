import { Tabs } from 'expo-router'
import { BlurView } from 'expo-blur'
import { Platform, PlatformColor, processColor, StyleSheet } from 'react-native'
import { useTheme } from '@/contexts/ThemeContext'
import TabBar from '@/components/ui/TabBar'
import { Colors } from '@/constants/Colors'
import TabBarHeader from '@/components/ui/TabBarHeader'

export default function MainLayout() {
	const { currentTheme } = useTheme()

	return (
		<Tabs
			tabBar={(props) => <TabBar {...props} />}
			screenOptions={{
				header: (props) => <TabBarHeader {...props} />,
				headerShown: true
			}}>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Home'
				}}
			/>
			<Tabs.Screen
				name='settings'
				options={{
					title: 'Settings'
				}}
			/>
		</Tabs>
	)
}
