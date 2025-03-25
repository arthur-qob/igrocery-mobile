import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { Input } from '@/components/Input'
import { BackgroundElement } from '@/components/ui/BackgroundElement'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/contexts/ThemeContext'
import { useSignIn } from '@clerk/clerk-expo'
import { BlurTint, BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
	Platform,
	PlatformColor,
	StyleSheet,
	View,
	Text,
	Alert,
} from 'react-native'

export default function SignInScreen() {
	const router = useRouter()

	const { currentTheme } = useTheme()

	const backgroundColor =
		Platform.OS === 'ios'
			? PlatformColor('systemBackground')
			: Colors[currentTheme as keyof typeof Colors].background

	const styles = StyleSheet.create({
		mainContainer: {
			backgroundColor: 'transparent',
			paddingTop: Platform.OS === 'ios' ? 40 : 100,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			gap: 20,
		},
		blurView: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
		},
		formContainer: {
			backgroundColor: Colors[currentTheme as keyof typeof Colors].panel,
			borderWidth: 1,
			borderColor:
				Colors[currentTheme as keyof typeof Colors].panelBorder,
			borderRadius: 10,
			paddingVertical: 30,
			paddingHorizontal: 20,
			width: '80%',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			gap: 20,
		},
	})

	const [userValues, setUserValues] = useState<{
		[key: string]: string | undefined
	}>({
		email: undefined,
		password: undefined,
	})

	const { signIn, setActive, isLoaded } = useSignIn()

	const [loading, setLoading] = useState(false)

	const handleInputChange = (value: string, key: string) => {
		setUserValues((prev) => ({
			...prev,
			[key]: value,
		}))
	}

	const handleSubmit = async () => {
		if (!isLoaded) {
			return
		}

		if (!userValues.email || !userValues.password) {
			Alert.alert('Please fill in all fields')
			return
		}

		setLoading((prev) => !prev)

		try {
			const signInAttempt = await signIn.create({
				identifier: userValues.email,
				password: userValues.password,
			})

			if (signInAttempt.status === 'complete') {
				await setActive({ session: signInAttempt.createdSessionId })
				router.replace('/')
			} else {
				// If the status isn't complete, check why. User might need to
				// complete further steps.
				Alert.alert('An error occurred. Please try again')
				console.error(
					'An error occurred. Please try again' +
						JSON.stringify(signInAttempt, null, 2)
				)
			}
		} catch (e) {
			Alert.alert('An error occurred')
			console.error('An error occurred' + JSON.stringify(e, null, 2))
		} finally {
			setLoading((prev) => !prev)
		}
	}

	return (
		<BackgroundElement backgroundColor={backgroundColor}>
			<Div style={styles.mainContainer}>
				<BlurView
					tint={`${currentTheme}`}
					experimentalBlurMethod='dimezisBlurView'
					intensity={50}
					style={[StyleSheet.absoluteFill, styles.blurView]}>
					<View style={styles.formContainer}>
						<Input
							placeholder='Email'
							variant='clean'
							loading={loading}
							onValueChange={(value) =>
								handleInputChange(value, 'email')
							}
							value={userValues.email}
						/>

						<Input
							placeholder='Password'
							type='password'
							variant='clean'
							loading={loading}
							onValueChange={(value) =>
								handleInputChange(value, 'password')
							}
							value={userValues.password}
						/>

						<Button
							variant='text'
							title='Forgot your password?'
							onPress={() => router.push('/reset-password')}
						/>

						<Button
							variant='filled'
							title='Sign In'
							loading={loading}
							onPress={handleSubmit}
						/>

						<Button
							variant='text'
							title="Don't have an account? Sign Up"
							onPress={() => router.push('/signup')}
						/>
					</View>
				</BlurView>
			</Div>
		</BackgroundElement>
	)
}
