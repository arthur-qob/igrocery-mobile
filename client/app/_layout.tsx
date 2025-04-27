import {
	ThemeProvider as ThemeContext,
	useTheme
} from '@/contexts/ThemeContext'
import {
	ThemeProvider,
	DarkTheme,
	DefaultTheme,
	Theme
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { ClerkLoaded, ClerkProvider, useAuth, useUser } from '@clerk/clerk-expo'
import { tokenCache } from '@/cache'
import { useColors } from '@/constants/Colors'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
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

	const Main = () => {
		const { currentTheme } = useTheme()

		const { themedColors, staticColors } = useColors()

		const CustomDefaultTheme: Theme = {
			...DefaultTheme,
			colors: {
				primary: staticColors.tintColor,
				background: themedColors.background,
				card: themedColors.panel,
				text: themedColors.text,
				border: themedColors.border,
				notification: staticColors.danger
			}
		}

		const CustomDarkTheme: Theme = {
			...DarkTheme,
			colors: {
				primary: staticColors.tintColor,
				background: themedColors.background,
				card: themedColors.panel,
				text: themedColors.text,
				border: themedColors.border,
				notification: staticColors.danger
			}
		}

		return (
			<ThemeProvider
				value={
					currentTheme === 'dark'
						? CustomDarkTheme
						: CustomDefaultTheme
				}>
				<Slot />
			</ThemeProvider>
		)
	}

	const AuthObserver = () => {
		const { isLoaded, user } = useUser()
		const { isLoaded: authLoaded } = useAuth()

		useEffect(() => {
			console.log('Clerk loaded:', isLoaded, 'User ID:', user?.id)

			if (isLoaded && !user) {
				console.warn('No user—force sign-in!')
			}
		}, [isLoaded, user])

		return null
	}

	return (
		<GestureHandlerRootView>
			<ThemeContext>
				<ClerkProvider
					tokenCache={tokenCache}
					publishableKey={publishableKey}>
					<ClerkLoaded>
						<AuthObserver />
						<Main />
					</ClerkLoaded>
				</ClerkProvider>
				<StatusBar style='auto' />
			</ThemeContext>
		</GestureHandlerRootView>
	)
}
