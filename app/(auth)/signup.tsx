import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { Input } from '@/components/Input'
import { Text } from '@/components/ThemedText'
import { BackgroundElement } from '@/components/ui/BackgroundElement'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/contexts/ThemeContext'
import { useSignUp } from '@clerk/clerk-expo'
import { BlurView } from 'expo-blur'
import { useNavigation, useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { TextInput } from 'react-native'
import {
	Platform,
	PlatformColor,
	StyleSheet,
	View,
	Alert,
	ActivityIndicator
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
		}
	})

	const nav = useNavigation()

	if (Platform.OS === 'android') {
		const [loadingScreen, setloadingScreen] = useState(true)

		useEffect(() => {
			setTimeout(() => {
				setloadingScreen((prev) => !prev)
				nav.setOptions({
					headerShown: true,
					headerTitle: 'Sign Up'
				})
			}, 2000)
		}, [])

		if (loadingScreen) {
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
	}

	useEffect(() => {
		nav.setOptions({
			headerShown: true,
			headerTitle: 'Sign Up'
		})
	}, [nav])

	const [userValues, setUserValues] = useState<{
		[key: string]: string | undefined
	}>({
		name: undefined,
		email: undefined,
		password: undefined,
		confirmPassword: undefined
	})

	const [loading, setLoading] = useState(false)

	const handleInputChange = (value: string, key: string) => {
		setUserValues((prev) => ({
			...prev,
			[key]: value
		}))
	}

	const { signUp, setActive, isLoaded } = useSignUp()

	const [pendingVerification, setPendingVerification] = useState(false)

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
			await signUp.create({
				emailAddress: userValues.email,
				password: userValues.password,
				username: userValues.name
			})

			await signUp.prepareEmailAddressVerification({
				strategy: 'email_code'
			})

			setPendingVerification((prev) => !prev)
		} catch (e) {
			Alert.alert('An error occurred')
			console.error('An error occurred' + JSON.stringify(e, null, 2))
		} finally {
			setLoading((prev) => !prev)
		}
	}

	const [verifyCode, setVerifyCode] = useState(Array(6).fill(''))

	const setCode = (value: string, index: number) => {
		if (!/^\d?$/.test(value)) {
			Alert.alert('Please enter a valid code (0-9)')
			return
		}

		setVerifyCode((prev) => {
			const newCode = [...prev]
			newCode[index] = value
			return newCode
		})
	}

	const handleVerify = async () => {
		if (!isLoaded) {
			return
		}

		if (!verifyCode || verifyCode.length < 6) {
			Alert.alert('Please enter a valid code')
			console.error('Please enter a valid code')
			return
		}

		setLoading((prev) => !prev)

		try {
			/// do stuff
		} catch (e) {
			console.error(e)
		} finally {
			setLoading((prev) => !prev)
		}
	}

	useEffect(() => {
		if (pendingVerification) {
			nav.setOptions({
				headerTitle: 'Verify your code'
			})
		}
	}, [pendingVerification, nav])

	if (pendingVerification) {
		const inputRefs = useRef<(TextInput | null)[]>([])

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
							<Text>
								Enter the 6-digit code sent to your email{' '}
								{userValues.email}
							</Text>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center'
								}}>
								{verifyCode.map((_, index) => (
									<TextInput
										key={index}
										ref={(el) =>
											(inputRefs.current[index] = el)
										}
										keyboardType='numeric'
										onChangeText={(value) => {
											setCode(value, index)
											if (
												value &&
												index < verifyCode.length - 1
											) {
												inputRefs.current[
													index + 1
												]?.focus()
											}
										}}
										value={verifyCode[index]}
										style={{
											width: 40,
											height: 50,
											fontSize: 20,
											color: Colors[
												currentTheme as keyof typeof Colors
											].text,
											textAlign: 'center',
											borderWidth: 1,
											borderColor:
												Colors[
													currentTheme as keyof typeof Colors
												].text,
											borderRadius: 10
										}}
									/>
								))}
							</View>
							<Button
								variant='filled'
								title='Verify'
								loading={loading}
								disabled={
									verifyCode.every((code) => code === '') ||
									loading
								}
								onPress={handleVerify}
							/>
						</View>
					</Div>
				</BlurView>
			</BackgroundElement>
		)
	}

	return (
		<BackgroundElement backgroundColor={backgroundColor}>
			<BlurView
				intensity={50}
				experimentalBlurMethod='dimezisBlurView'
				style={{
					...StyleSheet.absoluteFillObject,
					position: 'absolute',
					inset: 0,
					overflow: 'hidden',
					backgroundColor: 'transparent'
				}}>
				<Div style={styles.mainContainer}>
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
				</Div>
			</BlurView>
		</BackgroundElement>
	)
}
