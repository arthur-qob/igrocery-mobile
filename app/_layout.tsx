import { ThemeProvider } from '@/contexts/ThemeContext'
import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	})

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

	if (!publishableKey) {
		throw new Error('Missing Clerk Publishable Key')
	}

	return (
		<ThemeProvider>
			<ClerkProvider
				tokenCache={tokenCache}
				publishableKey={publishableKey}>
				<Slot />
			</ClerkProvider>
			<StatusBar style='auto' />
		</ThemeProvider>
	)
}
