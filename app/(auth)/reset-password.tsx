//
// Import needed functions, state variables and components from installed dependencies
//

import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { Input } from '@/components/Input'
import { Text } from '@/components/ThemedText'
import { BackgroundElement } from '@/components/ui/BackgroundElement'
import { useColors } from '@/constants/Colors'
import { useTheme } from '@/contexts/ThemeContext'
import { useSignIn } from '@clerk/clerk-expo'
import { BlurView } from 'expo-blur'
import { useNavigation, useRouter } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import {
	ActivityIndicator,
	Alert,
	Platform,
	PlatformColor,
	StyleSheet,
	TextInput,
	View
} from 'react-native'

// Function responsible for rendering the screen for this route
export default function ResetPasswordScreen() {
	//
	// On-mount settings and definitions
	//

	// Load the current theme used by the devide (light or dark) to be used in styles
	const { currentTheme } = useTheme()

	// Load router from expo-router for screen navigation
	const router = useRouter()

	const { themedColors, staticColors } = useColors()

	// Define the BackgroundElement's background color according to the current theme
	const backgroundColor = themedColors.background as any

	// Load the navigation object to define properties like headerTitle
	const nav = useNavigation()

	// A little work-around for buggy white screen on Android devices when trying to render <BlurView>
	const [loadingScreen, setloadingScreen] = useState(true)

	// Build a styles object for styling elements and components in the screen
	const styles = StyleSheet.create({
		mainContainer: {
			backgroundColor: 'transparent',
			paddingTop: Platform.OS === 'ios' ? 40 : 100,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			gap: 20
		},
		formContainer: {
			backgroundColor: themedColors.panel,
			borderWidth: 1,
			borderColor: themedColors.panelBorder,
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
			color: themedColors.text,
			textAlign: 'center',
			borderWidth: 1,
			borderColor: themedColors.text,
			borderRadius: 10
		},
		obs: {
			fontSize: 15,
			color: Platform.OS === 'ios' ? PlatformColor('systemGray3') : 'gray'
		},
		errorsContainer: {
			width: 'auto',
			borderRadius: 10,
			padding: 20,
			backgroundColor: staticColors.danger
		},
		errors: {
			fontWeight: 'semibold',
			fontSize: 20
		}
	})

	// Setting header visibility and title immediatly after screen renderization when on any other platform
	useEffect(() => {
		nav.setOptions({
			headerShown: true,
			headerTitle: 'Reset Password'
		})

		if (Platform.OS === 'android') {
			const timeout = setTimeout(() => {
				setloadingScreen(false)
				nav.setOptions({
					headerShown: true,
					headerTitle: 'Reset Password'
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

	//
	// Setting variables, objects and states
	//

	// Build an object to store the validation patterns utilized throughout the code
	const validationPatterns: { [key: string]: RegExp } = {
		email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/, // Check if email address is in valid forma (E.g.: example@email.com)
		codeDigit: /^[0-9]{1,1}$/, // Check if each digit is only one valid digit (0-9)
		code: /^\d{6,}$/, // Check if verification code is made of digits (0-9) and is specifically 6 digits long
		newPassword:
			/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
	}

	// Define variable for the error messages
	const [errorMsg, setErrorMessage] = useState<string>('')

	const [values, setValues] = useState<{ [key: string]: string | any }>({
		email: '',
		verifyCode: Array(6).fill(''),
		newPassword: ''
	})

	const [errors, setErrors] = useState<{ [key: string]: boolean }>({
		email: false,
		verifyCode: false,
		newPassword: false
	})

	// Define a checker for whether the provided email is in valid format
	const [emailIsValid, setEmailIsValid] = useState<boolean>(false)
	// Define a checker for whether the provided verification code is in valid format
	const [verifyCodeIsValid, setVerifyCodeIsValid] = useState<boolean>(false)
	// Define a checker for whether the provided new password is in valid format
	const [newPasswordIsValid, setNewPasswordIsValid] = useState<boolean>(false)

	useEffect(() => {
		setEmailIsValid(validationPatterns.email.test(values.email))
		setVerifyCodeIsValid(
			validationPatterns.code.test(values.verifyCode.join(''))
		)
		setNewPasswordIsValid(
			validationPatterns.newPassword.test(values.newPassword)
		)
	}, [values.email, values.verifyCode, values.newPassword])

	// Define a state variable to indicate whether the program is in loading state or not
	const [loading, setLoading] = useState(false)

	// Load variable and methods from the useSignIn() hook provided by Clerk
	const { signIn, isLoaded, setActive } = useSignIn()

	// Define a state variable to determine whether the user has provided the verification code or not
	const [pendingVerification, setPendingVerification] = useState(false)

	//
	// Definitions of functions
	//

	const handleInputChange = (value: string, key: string) => {
		setValues((prev) => ({
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
			email: false,
			verifyCode: false,
			newPassword: false
		})
	}

	/**
	 * Define the email submition form.
	 * Called when the submit button is pressed. It takes the email address provided by the user and attempts to reset the user's password by creating a new account and replacing the old one
	 * @async
	 * @void
	 */
	const handleSubmit = async () => {
		setLoading(true)

		resetErrors()

		if (!values.email) {
			setErrors((prev) => ({ ...prev, email: true }))
			setLoading(false)
			return Alert.alert('Please enter your email address.')
		}

		if (!emailIsValid) {
			setErrors((prev) => ({ ...prev, email: true }))
			setLoading(false)
			return Alert.alert('Invalid email format.')
		}

		try {
			await signIn?.create({
				strategy: 'reset_password_email_code',
				identifier: values.email
			})
			setPendingVerification(true)
			Alert.alert(`A verification code has been sent to ${values.email}.`)
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

	/**
	 * Define function to set the state variable for verification code after checking if it is valid
	 * @param value - new digit
	 * @param index - array position in which the new digit will be placed
	 * @void
	 */
	const setCode = (value: string, index: number) => {
		if (!validationPatterns.codeDigit.test(value)) {
			setErrors((prev) => ({ ...prev, verifyCode: true }))
			return // Avoid unnecessary state updates
		}

		setValues((prev) => {
			const newCode = [...prev.verifyCode]
			newCode[index] = value
			return { ...prev, verifyCode: newCode }
		})
	}

	/**
	 * Define function to manage and set the new provided password
	 * @async
	 * @void
	 */
	const handleNewPasswordSubmition = async () => {
		setLoading(true)

		resetErrors()

		if (!isLoaded) {
			setLoading(false)
			return
		}

		if (!values.verifyCode) {
			setErrors((prev) => ({
				...prev,
				verifyCode: true
			}))
			setErrorMessage('Verification code is required to proceed.')
			Alert.alert(errorMsg)
			console.error(errorMsg)
			setLoading(false)
			return
		}

		if (!verifyCodeIsValid) {
			setErrors((prev) => ({
				...prev,
				verifyCode: true
			}))
			setErrorMessage(
				'Verification code is not valid or incomplete. Please enter a valid code'
			)
			Alert.alert(errorMsg)
			console.error(errorMsg)
			setLoading(false)
			return
		}

		if (!values.newPassword) {
			setErrors((prev) => ({
				...prev,
				newPassword: true
			}))
			setErrorMessage('A new password must be provided!')
			Alert.alert(errorMsg)
			console.error(errorMsg)
			setLoading(false)
			return
		}

		if (!newPasswordIsValid) {
			setErrors((prev) => ({
				...prev,
				newPassword: true
			}))
			setErrorMessage(
				'New password is not valid. Passwords must have at least:\n1 lowercase letter (a-z), 1 number(0-9) and 1 symbom(!@#$%^&*).'
			)
			Alert.alert(errorMsg)
			console.error(errorMsg)
			setLoading(false)
			return
		}

		try {
			const signUpAttempt = await signIn.attemptFirstFactor({
				strategy: 'reset_password_email_code',
				code: values.verifyCode.join(''),
				password: values.newPassword
			})

			if (
				signUpAttempt.status === 'complete' &&
				signUpAttempt.createdSessionId
			) {
				await setActive({ session: signUpAttempt.createdSessionId })
				router.replace('/signin')
			} else {
				Alert.alert('Session activation failed.')
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

	// In the case of the state variable pendingVerification is true, the screen will display a different content meant to retrieve the verification code and new password values
	const inputRefs = useRef<(TextInput | null)[]>([])
	if (pendingVerification) {
		const getErrorStyles = () => {
			if (errors.verifyCode) {
				return {
					borderWidth: 2,
					borderColor: staticColors.danger,
					color: staticColors.danger
				}
			}

			return
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
								{values.email}
							</Text>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center'
								}}>
								{values.verifyCode.map(
									(_: null, index: number) => (
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
													index <
														values.verifyCode
															.length -
															1
												) {
													inputRefs.current[
														index + 1
													]?.focus()
												}
											}}
											value={values.verifyCode[index]}
											style={{
												...styles.codeDigits,
												...getErrorStyles()
											}}
										/>
									)
								)}
							</View>
							<Text style={styles.obs}>
								If you can't find the code in your inbox, try
								looking in the SPAM folder.
							</Text>
							<Input
								placeholder='New password'
								type='password'
								variant='clean'
								loading={loading}
								withErrors={errors.newPassword}
								onValueChange={(value) =>
									handleInputChange(value, 'newPassword')
								}
								value={values.newPassword}
							/>
							<Button
								variant='filled'
								title='Verify'
								loading={loading}
								disabled={!verifyCodeIsValid || loading}
								onPress={handleNewPasswordSubmition}
							/>
						</View>
					</Div>
				</BlurView>
			</BackgroundElement>
		)
	}

	// Default layout to be displayed in the screen
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
								handleInputChange(value, 'email')
							}
							value={values.email}
						/>

						<Button
							variant='filled'
							title='Submit'
							loading={loading}
							disabled={!emailIsValid || loading}
							onPress={handleSubmit}
						/>
					</View>
					{errorMsg !== '' && (
						<View style={styles.errorsContainer}>
							<Text style={styles.errors}>{errorMsg}</Text>
						</View>
					)}
				</Div>
			</BlurView>
		</BackgroundElement>
	)
}
