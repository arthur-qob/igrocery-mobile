import { Redirect, Stack, Tabs } from 'expo-router'
import TabBar from '@/components/ui/TabBar'
import TabBarHeader from '@/components/ui/TabBarHeader'
import { useAuth, useUser } from '@clerk/clerk-expo'

export default function MainLayout() {
	const { isSignedIn } = useAuth()

	if (!isSignedIn) {
		return <Redirect href={'/(auth)'} />
	}

	const { user } = useUser()
	const userId = user?.id

	return (
		<Tabs
			tabBar={(props) => <TabBar {...props} />}
			screenOptions={{
				header: (props) => <TabBarHeader {...props} />,
				headerShown: true,
				animation: 'shift'
			}}>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Home'
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
