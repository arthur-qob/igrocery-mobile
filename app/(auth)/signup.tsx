import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { Input } from '@/components/Input'
import { BackgroundElement } from '@/components/ui/BackgroundElement'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/contexts/ThemeContext'
import { useSignUp } from '@clerk/clerk-expo'
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

export default function SignUpScreen() {
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
		text: {
			color: Colors[currentTheme as keyof typeof Colors].text,
		},
		title: {
			fontSize: Platform.OS === 'ios' ? 70 : 65,
			textAlign: 'center',
		},
		appName: {
			fontWeight: 'bold',
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
		name: undefined,
		email: undefined,
		password: undefined,
		confirmPassword: undefined,
	})

	const { signUp, setActive, isLoaded } = useSignUp()

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

		if (
			!userValues.name ||
			!userValues.email ||
			!userValues.password ||
			!userValues.confirmPassword
		) {
			Alert.alert('Please fill in all fields')
			return
		}

		setLoading((prev) => !prev)

		try {
			// do stuff
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
							placeholder='Name'
							variant='clean'
							loading={loading}
							onValueChange={(value) =>
								handleInputChange(value, 'name')
							}
							value={userValues.name}
						/>

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

						<Input
							placeholder='Confirm Password'
							type='password'
							variant='clean'
							loading={loading}
							onValueChange={(value) =>
								handleInputChange(value, 'confirmPassword')
							}
							value={userValues.confirmPassword}
						/>

						<Button
							variant='filled'
							title='Sign Up'
							loading={loading}
							onPress={handleSubmit}
						/>

						<Button
							variant='text'
							title='Already have an account? Sign In'
							onPress={() => router.push('/signin')}
						/>
					</View>
				</BlurView>
			</Div>
		</BackgroundElement>
	)
}
