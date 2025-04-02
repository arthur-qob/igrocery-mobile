import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { Text } from '@/components/ThemedText'
import { useClerk } from '@clerk/clerk-expo'

export default function HomeScreen() {
	const { signOut } = useClerk()

	return (
		<Div>
			<Text>Main</Text>
			<Button
				variant='filled'
				title='Sign Out'
				onPress={signOut}
			/>
		</Div>
	)
}
