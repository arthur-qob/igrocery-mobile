import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { Input } from '@/components/Input'
import { BackgroundElement } from '@/components/ui/BackgroundElement'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/contexts/ThemeContext'
import { BlurView } from 'expo-blur'
import { Stack } from 'expo-router'
import React, { useState } from 'react'
import {
	Platform,
	PlatformColor,
	processColor,
	StyleSheet,
	View,
} from 'react-native'

export default function ResetPasswordScreen() {
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

	const [email, setEmail] = useState('')

	return (
		<>
			<Stack.Screen
				options={{
					title: 'Reset Password',
					headerLargeTitle: true,
					headerTransparent: true,
					headerBackground: () => (
						<BlurView
							tint={`${currentTheme}`}
							experimentalBlurMethod='dimezisBlurView'
							intensity={50}
							style={StyleSheet.absoluteFill}
						/>
					),
					headerLargeTitleShadowVisible: false,
					headerShadowVisible: true,
					headerLargeStyle: {
						backgroundColor: 'transparent',
					},
					headerTitleStyle: {
						color:
							Platform.OS === 'ios'
								? String(processColor(PlatformColor('label')))
								: Colors[currentTheme].text,
					},
					headerBackButtonDisplayMode: 'minimal',
					headerTintColor:
						Platform.OS === 'ios'
							? (processColor(
									PlatformColor('label')
								) as unknown as string)
							: Colors[currentTheme].text,
				}}
			/>
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
								onValueChange={(value) => setEmail(value)}
								value={email}
							/>
							<Button
								variant='filled'
								title='Reset password'
								// onPress={handleSubmit}
							/>
						</View>
					</BlurView>
				</Div>
			</BackgroundElement>
		</>
	)
}
