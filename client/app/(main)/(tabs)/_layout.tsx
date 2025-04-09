import { Redirect, Stack, Tabs } from 'expo-router'
import TabBar from '@/components/ui/TabBar'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useAuth, useUser } from '@clerk/clerk-expo'
import Header from '@/components/ui/Header'

export default function MainTabsLayout() {
	const { isSignedIn } = useAuth()

	if (!isSignedIn) {
		return <Redirect href={'/(auth)'} />
	}

	const { user } = useUser()
	const userId = user?.id

	return (
		<Tabs
			tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
			screenOptions={{
				header: (props: any) => <Header {...props} />,
				headerShown: true
			}}>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Lists'
				}}
				// initialParams={userId}
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
