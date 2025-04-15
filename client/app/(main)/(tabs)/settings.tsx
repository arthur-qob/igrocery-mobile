import { Button } from '@/components/Button'
import CurrencyButton from '@/components/CurrencyButton'
import { Div } from '@/components/DynamicInterfaceView'
import ProfileButton from '@/components/ProfileButton'
import SettingsButton from '@/components/SettingsButton'
import { Text } from '@/components/ThemedText'
import { ThemeSelector } from '@/components/ThemeSelector'
import { useClerk } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert, StyleSheet } from 'react-native'

export default function SettingsScreen() {
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

	const styles = StyleSheet.create({
		mainContainer: {
			paddingTop: 45,
			paddingBottom: 100,
			flexDirection: 'column',
			gap: 20
		}
	})

	return (
		<Div style={styles.mainContainer}>
			<ProfileButton />
			<Text
				type='subtitle'
				style={{ marginTop: 15 }}>
				Currency
			</Text>
			<CurrencyButton />
			<Text
				type='subtitle'
				style={{ marginTop: 15 }}>
				Language
			</Text>
			<SettingsButton content={<Text>Language</Text>} />
			<Text
				type='subtitle'
				style={{ marginTop: 15 }}>
				Theme
			</Text>
			<ThemeSelector />
			<Button
				variant='filled'
				title='Sign Out'
				loading={loading}
				disabled={loading}
				onPress={handleSignOut}
			/>
		</Div>
	)
}
