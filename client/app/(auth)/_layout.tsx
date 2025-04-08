import { Colors } from '@/constants/Colors'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@clerk/clerk-expo'
import { BlurView } from 'expo-blur'
import { Redirect, Stack } from 'expo-router'
import {
	Platform,
	PlatformColor,
	processColor,
	StyleSheet,
	View
} from 'react-native'

export default function AuthLayout() {
	const { currentTheme } = useTheme()

	const { isLoaded, isSignedIn } = useAuth()

	if (!isLoaded) {
		return null
	}

	// if (isSignedIn || Platform.OS === 'android') {
	// 	return <Redirect href={'/(main)'} />
	// }

	if (isSignedIn) {
		return <Redirect href={'/(main)/(tabs)'} />
	}

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				headerLargeTitle: true,
				headerTransparent: true,
				headerBackground: () => (
					// <BlurView
					// 	intensity={50}
					// 	style={{
					// 		...StyleSheet.absoluteFillObject,
					// 		overflow: 'hidden',
					// 		backgroundColor: 'transparent'
					// 	}}
					// />
					<View
						style={{
							overflow: 'hidden',
							backgroundColor: 'transparent'
						}}
					/>
				),
				headerLargeTitleShadowVisible: false,
				headerShadowVisible: true,
				headerLargeStyle: {
					backgroundColor: 'transparent'
				},
				headerTitleStyle: {
					color:
						Platform.OS === 'ios'
							? String(processColor(PlatformColor('label')))
							: Colors[currentTheme].text
				},
				headerBackButtonDisplayMode: 'minimal',
				headerTintColor:
					Platform.OS === 'ios'
						? (processColor(
								PlatformColor('label')
							) as unknown as string)
						: Colors[currentTheme].text
			}}>
			<Stack.Screen
				name='index'
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name='signin'
				options={{
					headerTitle: 'Sign In'
				}}
			/>
			<Stack.Screen
				name='signup'
				options={{
					headerTitle: 'Sign Up'
				}}
			/>
		</Stack>
	)
}
