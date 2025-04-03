import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { Input } from '@/components/Input'
import { Text } from '@/components/ThemedText'
import { BackgroundElement } from '@/components/ui/BackgroundElement'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/contexts/ThemeContext'
import { useSignIn } from '@clerk/clerk-expo'
import { BlurView } from 'expo-blur'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import {
	Platform,
	PlatformColor,
	StyleSheet,
	View,
	Alert,
	ActivityIndicator
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
			gap: 20
		},
		text: {
			color: Colors[currentTheme as keyof typeof Colors].text
		},
		title: {
			fontSize: Platform.OS === 'ios' ? 70 : 65,
			textAlign: 'center'
		},
		appName: {
			fontWeight: 'bold'
		},
		formContainer: {
			backgroundColor: Colors[currentTheme as keyof typeof Colors].panel,
			borderWidth: 1,
			borderColor:
				Colors[currentTheme as keyof typeof Colors].panelBorder,
			borderRadius: 10,
			paddingVertical: 30,
			paddingHorizontal: 20,
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			gap: 20
		},
		errorsContainer: {
			width: 'auto',
			borderRadius: 10,
			padding: 20,
			backgroundColor:
				Platform.OS === 'ios'
					? PlatformColor('systemRed')
					: Colors.danger
		},
		errors: {
			fontWeight: 'semibold',
			fontSize: 20
		}
	})

	const nav = useNavigation()
	const [loadingScreen, setloadingScreen] = useState(true)

	useEffect(() => {
		nav.setOptions({
			headerShown: true,
			headerTitle: 'Sign In'
		})

		if (Platform.OS === 'android') {
			const timeout = setTimeout(() => {
				setloadingScreen(false)
				nav.setOptions({
					headerShown: true,
					headerTitle: 'Sign Up'
				})
			}, 2000)

			return () => clearTimeout(timeout)
		}
	}, [])

	if (Platform.OS === 'android' && loadingScreen) {
		return (
			<Div
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					flex: 1
				}}>
				<ActivityIndicator size='large' />
			</Div>
		)
	}

	const [userValues, setUserValues] = useState<{
		[key: string]: string
	}>({
		emailAddress: (useLocalSearchParams().emailAddress as string) || '',
		password: (useLocalSearchParams().password as string) || ''
	})

	const [errorMsg, setErrorMessage] = useState<string>('')

	const [errors, setErrors] = useState<{ [key: string]: boolean }>({
		emailAddress: false,
		password: false
	})

	const validationPatterns: { [key: string]: RegExp } = {
		email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/, // Check if email address is in valid forma (E.g.: example@email.com)
		password: /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/ // Check if password is at least 8 characaters long with at least 1 lowercase letter, 1 number and 1 symbol
	}

	const [emailIsValid, setEmailIsValid] = useState<boolean>(false)
	const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false)

	useEffect(() => {
		setEmailIsValid(
			validationPatterns.email.test(userValues.emailAddress as string)
		)
		setPasswordIsValid(
			validationPatterns.password.test(userValues.password as string)
		)
		console.log('entrou')
	}, [userValues.email, userValues.password])

	const { signIn, setActive, isLoaded } = useSignIn()

	const [loading, setLoading] = useState(false)

	const handleInputChange = (value: string, key: string) => {
		setUserValues((prev) => ({
			...prev,
			[key]: value
		}))

		setErrors((prev) => ({
			...prev,
			[key]: value.trim() === ''
		}))
	}

	const resetErrors = () => {
		setErrors({
			emailAddress: false,
			password: false
		})
	}

	const handleSubmit = async () => {
		setLoading(true)

		resetErrors()

		if (!isLoaded) {
			setLoading(false)
			return
		}

		if (!userValues.emailAddress || !userValues.password) {
			setErrors((prev) => ({
				...prev,
				email: userValues.emailAddress.trim() === '',
				password: userValues.password.trim() === ''
			}))
			setErrorMessage('Please fill in all fields')
			Alert.alert(errorMsg)
			console.log(errorMsg)
			setLoading(false)
			return
		}

		if (!emailIsValid) {
			setErrors((prev) => ({
				...prev,
				emailAddress: true
			}))
			setErrorMessage('Email address is not valid. Please try again')
			Alert.alert(errorMsg)
			console.error(errorMsg)
			setLoading(false)
			return
		}

		if (!passwordIsValid) {
			setErrors((prev) => ({
				...prev,
				password: true
			}))
			setErrorMessage('Password is not valid. Please try again')
			Alert.alert(errorMsg)
			console.error(errorMsg)
			setLoading(false)
			return
		}

		try {
			const signInAttempt = await signIn.create({
				identifier: userValues.emailAddress,
				password: userValues.password
			})

			if (signInAttempt.status === 'complete') {
				await setActive({ session: signInAttempt.createdSessionId })
				router.replace('/(main)')
			} else {
				Alert.alert('An error occurred. Please try again')
				console.error(
					signInAttempt || useLocalSearchParams().createdSessionId
				)
			}
		} catch (e: any) {
			const errorParamName = e.errors
				.map((err: any) => err.meta.paramName)
				.join('')

			setErrors((prev) => ({
				...prev,
				[errorParamName]: true
			}))

			setErrorMessage((prev) => {
				let newMsg = prev
				newMsg =
					'An error occurred' +
					'\n' +
					e.errors.map((err: any) => err.longMessage).join('\n')
				return newMsg
			})
			Alert.alert(errorMsg)
			console.error(JSON.stringify(e, null, 2))
		} finally {
			setLoading(false)
		}
	}

	return (
		<BackgroundElement backgroundColor={backgroundColor}>
			<BlurView
				intensity={50}
				experimentalBlurMethod='dimezisBlurView'
				style={{
					...StyleSheet.absoluteFillObject,
					overflow: 'hidden',
					backgroundColor: 'transparent'
				}}>
				<Div style={styles.mainContainer}>
					<View style={styles.formContainer}>
						<Input
							placeholder='Email'
							type='email'
							variant='clean'
							loading={loading}
							onValueChange={(value) =>
								handleInputChange(value, 'emailAddress')
							}
							value={userValues.emailAddress}
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
					{Object.values(errors).some((value) => value === true) && (
						<View style={styles.errorsContainer}>
							<Text style={styles.errors}>{errorMsg}</Text>
						</View>
					)}
				</Div>
			</BlurView>
		</BackgroundElement>
	)
}
