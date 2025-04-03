import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { useClerk, useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert, View } from 'react-native'

export default function SettingsScreen() {
	const { user } = useUser()

	const [loading, setLoading] = useState<boolean>(false)

	const { signOut } = useClerk()

	const router = useRouter()

	const handleSignOut = () => {
		setLoading(true)

		Alert.alert('Sign Out', 'Are you sure you wish to sign out?', [
			{
				text: 'No',
				onPress: () => {
					console.log('User optedt out of sign out')
				},
				style: 'default'
			},
			{
				text: 'Yes',
				onPress: async () => {
					await signOut()
					router.replace('/(auth)')
				},
				style: 'destructive'
			}
		])

		setLoading(false)
	}

	return (
		<Div>
			<View>
				<Button
					variant='filled'
					title='Sign Out'
					loading={loading}
					disabled={loading}
					onPress={handleSignOut}
				/>
			</View>
		</Div>
	)
}
