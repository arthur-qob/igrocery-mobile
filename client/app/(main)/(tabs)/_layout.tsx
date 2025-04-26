import { Redirect, Stack, Tabs } from 'expo-router'
import TabBar from '@/components/ui/TabBar'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

export default function MainTabsLayout() {
	return (
		<Tabs
			tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
			screenOptions={{
				// header: (props: any) => <Header {...props} />,
				headerShown: false,
				animation: 'shift'
			}}>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Lists'
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
