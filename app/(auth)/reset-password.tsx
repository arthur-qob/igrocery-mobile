import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { Input } from '@/components/Input'
import { BackgroundElement } from '@/components/ui/BackgroundElement'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/contexts/ThemeContext'
import { BlurView } from 'expo-blur'
import { useNavigation, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
	ActivityIndicator,
	Alert,
	Platform,
	PlatformColor,
	StyleSheet,
	View
} from 'react-native'

export default function ResetPasswordScreen() {
	const { currentTheme } = useTheme()

	const router = useRouter()

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
					headerTitle: 'Reset Password'
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
			headerTitle: 'Reset Password'
		})
	}, [nav])

	const [loading, setLoading] = useState(false)

	const [email, setEmail] = useState('')

	const [emailIsValid, setEmailIsValid] = useState(false)

	const handleSubmit = () => {
		setLoading((prev) => !prev)

		if (!email) {
			setLoading((prev) => !prev)
			Alert.alert('Please enter your email address')
			return
		}

		if (email.includes('@') && email.includes('.com')) {
			setEmailIsValid((prev) => !prev)
		} else {
			Alert.alert('Email is invalid. Please try again.')
			setLoading((prev) => !prev)
			return
		}

		if (emailIsValid) {
			// Do stuff
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
							variant='clean'
							loading={loading}
							onValueChange={(value) => setEmail(value)}
							value={email}
						/>

						<Button
							variant='filled'
							title='Submit'
							loading={loading}
							disabled={!emailIsValid || loading}
							onPress={handleSubmit}
						/>
					</View>
				</Div>
			</BlurView>
		</BackgroundElement>
	)
}
