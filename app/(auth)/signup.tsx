import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { Input } from '@/components/Input'
import { Text } from '@/components/ThemedText'
import { BackgroundElement } from '@/components/ui/BackgroundElement'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth, useClerk, useSignUp } from '@clerk/clerk-expo'
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

	const themeColors = Colors[currentTheme as keyof typeof Colors]

	const backgroundColor =
		Platform.OS === 'ios'
			? PlatformColor('systemBackground')
			: themeColors.background

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
			color: themeColors.text
		},
		title: {
			fontSize: Platform.OS === 'ios' ? 70 : 65,
			textAlign: 'center'
		},
		appName: {
			fontWeight: 'bold'
		},
		formContainer: {
			backgroundColor: themeColors.panel,
			borderWidth: 1,
			borderColor: themeColors.panelBorder,
			borderRadius: 10,
			paddingVertical: 30,
			paddingHorizontal: 20,
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			gap: 20
		},
		codeDigits: {
			width: 40,
			height: 50,
			fontSize: 20,
			color: Colors[currentTheme as keyof typeof Colors].text,
			textAlign: 'center',
			borderWidth: 1,
			borderColor: Colors[currentTheme as keyof typeof Colors].text,
			borderRadius: 10
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
			headerTitle: 'Sign Up'
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
		firstName: '',
		emailAddress: '',
		password: '',
		confirmPassword: ''
	})

	const [verifyCode, setVerifyCode] = useState(Array(6).fill(''))

	const [errorMsg, setErrorMessage] = useState<string>('')

	const [errors, setErrors] = useState<{
		[key: string]: boolean
	}>({
		firstName: false,
		emailAddress: false,
		password: false,
		confirmPassword: false,
		verifyCode: false
	})

	const validationPatterns: { [key: string]: RegExp } = {
		emailAddress: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/, // Check if email address is in valid forma (E.g.: example@email.com)
		password: /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, // Check if password is at least 8 characaters long with at least 1 lowercase letter, 1 number and 1 symbol
		confirmPassword:
			/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, // Check if password confirmation is at least 8 characaters long with at least 1 lowercase letter, 1 number and 1 symbol
		codeDigit: /^\d$/, // Check if each digit is only one valid digit (0-9)
		code: /^\d{6,}$/ // Check if verification code is made of digits (0-9) and is specifically 6 digits long
	}

	const [emailIsValid, setEmailIsValid] = useState<boolean>(false)
	const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false)
	const [confirmPasswordIsValid, setConfirmPasswordIsValid] =
		useState<boolean>(false)
	const [verifyCodeIsValid, setVerifyCodeIsValid] = useState<boolean>(false)

	useEffect(() => {
		setEmailIsValid(
			validationPatterns.emailAddress.test(userValues.emailAddress)
		)
		setPasswordIsValid(
			validationPatterns.password.test(userValues.password)
		)
		setConfirmPasswordIsValid(
			validationPatterns.confirmPassword.test(userValues.confirmPassword)
		)
		setVerifyCodeIsValid(validationPatterns.code.test(verifyCode.join('')))
	}, [userValues, verifyCode])

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
			firstName: false,
			emailAddress: false,
			confirmPassword: false,
			verifyCode: false
		})
	}

	const { isSignedIn } = useAuth()
	const { signUp, setActive, isLoaded } = useSignUp()
	const { signOut } = useClerk()

	const [pendingVerification, setPendingVerification] = useState(false)

	useEffect(() => {
		if (pendingVerification) {
			nav.setOptions({
				headerTitle: 'Verify your code'
			})
		} else {
			nav.setOptions({
				headerTitle: 'Sign Up'
			})
		}
	}, [pendingVerification])

	const inputRefs = useRef<(TextInput | null)[]>([])
	if (pendingVerification) {
		const getErrorStyles = () => {
			if (errors.verifyCode) {
				return {
					borderWidth: 2,
					borderColor:
						Platform.OS === 'ios'
							? PlatformColor('systemRed')
							: Colors.danger,
					color:
						Platform.OS === 'ios'
							? PlatformColor('systemRed')
							: Colors.danger
				}
			}

			return
		}

		const setCode = (value: string, index: number) => {
			if (!validationPatterns.codeDigit.test(value)) {
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
			setLoading(true)

			resetErrors()

			if (!isLoaded) {
				setLoading(false)
				return
			}

			if (!verifyCodeIsValid) {
				setErrors((prev) => ({
					...prev,
					verifyCode: true
				}))
				Alert.alert('Please enter a valid code')
				console.error('Please enter a valid code')
				setLoading(false)
				return
			}

			try {
				const signUpAttempt =
					await signUp.attemptEmailAddressVerification({
						code: verifyCode.join('')
					})

				if (
					signUpAttempt.status === 'complete' &&
					signUpAttempt.createdSessionId
				) {
					console.log(isSignedIn)
					await signOut()
					console.log(isSignedIn)
					router.replace('/(auth)')
					router.push({
						pathname: '/signin',
						params: {
							emailAddress: userValues.emailAddress,
							password: userValues.password
						}
					})
				} else {
					setErrorMessage(
						'Sign Up Attempt Failed\n For more information, check the terminal'
					)
					Alert.alert(errorMsg)
					console.error(signUpAttempt)
				}
			} catch (e: any) {
				const errorParamName = e.errors
					.map((err: any) => err.meta.paramName)
					.join('')

				if (errorParamName === 'code') {
					setErrors((prev) => ({
						...prev,
						verifyCode: true
					}))
				} else {
					setErrors((prev) => ({
						...prev,
						newPassword: true
					}))
				}

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
							<Text>
								Enter the 6-digit code sent to your email{' '}
								{userValues.emailAddress}
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
											...styles.codeDigits,
											...getErrorStyles()
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
									loading ||
									!verifyCodeIsValid
								}
								onPress={handleVerify}
							/>
						</View>
					</Div>
				</BlurView>
			</BackgroundElement>
		)
	} else {
		const handleSubmit = async () => {
			setLoading(true)

			resetErrors()

			if (!isLoaded) {
				setLoading(false)
				return
			}

			if (
				!userValues.firstName ||
				!userValues.emailAddress ||
				!userValues.password ||
				!userValues.confirmPassword
			) {
				setErrors({
					firstName: !userValues.firstName.trim(),
					emailAddress: !userValues.emailAddress.trim(),
					password: !userValues.password.trim(),
					confirmPassword: !userValues.confirmPassword.trim()
				})
				setErrorMessage('Please fill in all fields')
				Alert.alert(errorMsg)
				setLoading(false)
				return
			}

			if (!emailIsValid) {
				setErrors((prev) => ({
					...prev,
					emailAddress: true
				}))
				setErrorMessage(
					'Email address is not valid. Please enter a valid email and try again'
				)
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
				setErrorMessage(
					'Password is not valid.\nPasswords must have at least:\n1 lowercase letter (a-z), 1 number(0-9) and 1 symbom(!@#$%^&*).'
				)
				Alert.alert(errorMsg)
				console.error(errorMsg)
				setLoading(false)
				return
			}

			if (!confirmPasswordIsValid) {
				setErrors((prev) => ({
					...prev,
					confirmPassword: true
				}))
				setErrorMessage(
					'Password confirmation is not valid.\nPassword confirmation must have at least:\n1 lowercase letter (a-z), 1 number(0-9) and 1 symbom(!@#$%^&*).'
				)
				Alert.alert(errorMsg)
				console.error(errorMsg)
				setLoading(false)
				return
			}

			if (userValues.password !== userValues.confirmPassword) {
				setErrors((prev) => ({
					...prev,
					password: true,
					confirmPassword: true
				}))
				setErrorMessage(
					'Password and confirmation do not match. Try again.'
				)
				Alert.alert(errorMsg)
				console.error(errorMsg)
				setLoading(false)
				return
			}

			try {
				await signUp.create({
					firstName: userValues.firstName,
					emailAddress: userValues.emailAddress,
					password: userValues.password
				})

				await signUp.prepareEmailAddressVerification({
					strategy: 'email_code'
				})

				Alert.alert(
					`A verification code has been sent to your email (${userValues.emailAddress}). Please check your inbox and verify it.`
				)

				setPendingVerification(true)
			} catch (e: any) {
				const errorParamName = e.errors
					.map((err: any) => err.meta.paramName)
					.join('')

				if (errorParamName === 'password') {
					setErrors((prev) => ({
						...prev,
						password: true,
						confirmPassword: true
					}))
				} else {
					setErrors((prev) => ({
						...prev,
						[errorParamName]: true
					}))
				}

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
								withErrors={errors.firstName}
								onValueChange={(value) =>
									handleInputChange(value, 'firstName')
								}
								value={userValues.firstName}
							/>

							<Input
								placeholder='Email'
								type='email'
								variant='clean'
								loading={loading}
								withErrors={errors.emailAddress}
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
								withErrors={errors.password}
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
								withErrors={errors.confirmPassword}
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
						{Object.values(errors).some(
							(value) => value === true
						) && (
							<View style={styles.errorsContainer}>
								<Text style={styles.errors}>{errorMsg}</Text>
							</View>
						)}
					</Div>
				</BlurView>
			</BackgroundElement>
		)
	}
}
