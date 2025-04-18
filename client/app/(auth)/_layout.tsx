import Header from '@/components/ui/Header'
import { Colors, useColors } from '@/constants/Colors'
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

	const { themedColors } = useColors()

	const { isLoaded, isSignedIn } = useAuth()

	if (!isLoaded) {
		return null
	}

	if (isSignedIn) {
		return <Redirect href={'/(main)/(tabs)'} />
	}

	return (
		<Stack
			screenOptions={
				Platform.OS === 'ios'
					? {
							headerLargeTitle: true,
							headerTransparent: true,
							headerBackground: () => (
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
								color: themedColors.text
							},
							headerBackButtonDisplayMode: 'minimal',
							headerTintColor: themedColors.text
						}
					: {
							header: (props: any) => <Header {...props} />
						}
			}>
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
