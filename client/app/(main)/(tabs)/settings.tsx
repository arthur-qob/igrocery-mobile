import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import ProfileButton from '@/components/ProfileButton'
import { Text } from '@/components/ThemedText'
import { ThemeSelector } from '@/components/ThemeSelector'
import { useColors } from '@/constants/Colors'
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

	const { themedColors, staticColors } = useColors()

	const styles = StyleSheet.create({
		mainContainer: {
			flexDirection: 'column',
			gap: 20
		},
		separator: {
			width: '100%',
			height: 1,
			backgroundColor: themedColors.separator,
			marginVertical: 5
		}
	})

	return (
		<Div style={styles.mainContainer}>
			<ProfileButton />
			<Text style={{ fontSize: 25, marginTop: 15 }}>Theme</Text>
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
