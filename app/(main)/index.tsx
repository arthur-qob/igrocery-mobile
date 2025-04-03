import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { Text } from '@/components/ThemedText'
import { useClerk, useUser } from '@clerk/clerk-expo'
import { Alert } from 'react-native'

export default function HomeScreen() {
	const { user } = useUser()

	return (
		<Div>
			<Text>Welcome, {user?.firstName}!</Text>
		</Div>
	)
}
