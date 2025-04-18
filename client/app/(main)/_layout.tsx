import { Text } from '@/components/ThemedText'
import IconSymbol from '@/components/ui/IconSymbol'
import { CurrencyProvider } from '@/contexts/CurrencyContext'
import { ListCreationProvider } from '@/contexts/ListCreationContext'
import { useTheme } from '@/contexts/ThemeContext'
import ListsStore from '@/stores/persistence/ListsStore'
import { HeaderBackground } from '@react-navigation/elements'
import { BlurTint, BlurView } from 'expo-blur'
import { Stack, useNavigation, useRouter, useSegments } from 'expo-router'
import { useLayoutEffect, useState } from 'react'
import { Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { underDampedSpringCalculations } from 'react-native-reanimated/lib/typescript/animation/springUtils'
import { Provider as TinyBaseProvider } from 'tinybase/ui-react'

export default function MainLayout() {
	const router = useRouter()

	const segments = useSegments()

	const [tabTitle, setTabTitle] = useState('')

	useLayoutEffect(() => {
		const currentScreen = segments[segments.length - 1]

		// console.log(currentScreen)

		const titles: Record<string, string> = {
			'(tabs)': 'Lists',
			settings: 'Settings',
			'[user]': 'Settings',
			'(currencies)': 'Settings'
		}

		setTabTitle(titles[currentScreen] || 'Lists')
	}, [segments])

	const { currentTheme } = useTheme()

	const contrastTheme = currentTheme === 'light' ? 'dark' : 'light'

	const blurIntensity = Platform.OS === 'android' ? 10 : 50

	const blurTint =
		process.env.EXPO_OS === 'ios'
			? (`systemChromeMaterial${currentTheme.replace(currentTheme.charAt(0), currentTheme.charAt(0).toUpperCase())}` as BlurTint)
			: (`systemChromeMaterial${contrastTheme.replace(contrastTheme.charAt(0), contrastTheme.charAt(0).toUpperCase())}` as BlurTint)

	return (
		<CurrencyProvider>
			<TinyBaseProvider>
				<ListsStore />
				<ListCreationProvider>
					<Stack
						initialRouteName='(tabs)'
						screenOptions={{
							headerLargeTitle: true,
							headerTransparent: true,
							headerBackground: () => (
								<BlurView
									tint={blurTint}
									intensity={blurIntensity}
									experimentalBlurMethod='dimezisBlurView'
									style={{
										...StyleSheet.absoluteFillObject,
										backgroundColor: 'transparent',
										overflow: 'hidden'
									}}
								/>
							),
							headerLargeTitleShadowVisible: false,
							headerShadowVisible: true,
							headerLargeStyle: {
								backgroundColor: 'transparent'
							}
						}}>
						<Stack.Screen
							name='(tabs)'
							options={{
								headerTitle: tabTitle,
								headerRight: () =>
									tabTitle === 'Lists' ? (
										<TouchableOpacity
											onPress={() =>
												router.push('/list/new/')
											}>
											<IconSymbol name='plus' />
										</TouchableOpacity>
									) : undefined
							}}
						/>
						<Stack.Screen
							name='(users)/[user]'
							options={{
								presentation:
									Platform.OS === 'ios'
										? 'formSheet'
										: 'modal',
								animation:
									Platform.OS === 'ios'
										? null
										: 'slide_from_bottom',
								sheetAllowedDetents: [0.5, 0.75, 1],
								sheetGrabberVisible: true,
								headerTransparent: true,
								headerTitle: ''
							}}
						/>
						<Stack.Screen
							name='list/new/index'
							options={{
								presentation:
									Platform.OS === 'ios'
										? 'formSheet'
										: 'modal',
								animation:
									Platform.OS === 'ios'
										? null
										: 'slide_from_bottom',
								sheetAllowedDetents: [1],
								sheetGrabberVisible: true,
								headerTransparent: true,
								headerTitle: ''
							}}
						/>
						<Stack.Screen
							name='list/new/scan'
							options={{
								presentation: 'fullScreenModal',
								headerTransparent: true,
								headerLargeTitle: false,
								headerTitle: 'Scan QR Code',
								headerLeft: () => (
									<TouchableOpacity
										onPress={() => router.back()}>
										<Text>cancel</Text>
									</TouchableOpacity>
								)
							}}
						/>
						<Stack.Screen
							name='list/new/create'
							options={{
								headerTitle: 'New List'
							}}
						/>
						{/* <Stack.Screen name='list/[listId]/product/[productId]' /> */}
						<Stack.Screen
							name='list/[listId]/product/new'
							options={{
								presentation:
									Platform.OS === 'ios'
										? 'formSheet'
										: 'modal',
								animation:
									Platform.OS === 'ios'
										? null
										: 'slide_from_bottom',
								headerTransparent: false,
								headerLargeTitle: false,
								headerTitle: 'Add Product',
								sheetAllowedDetents: [0.75, 1],
								sheetGrabberVisible: true
							}}
						/>
						<Stack.Screen
							name='emojiPicker'
							options={{
								headerTitle: 'Choose an Emoji',
								presentation:
									Platform.OS === 'ios'
										? 'formSheet'
										: 'modal',
								animation:
									Platform.OS === 'ios'
										? null
										: 'slide_from_bottom',
								sheetAllowedDetents: [0.5, 1],
								sheetGrabberVisible: true,
								headerTransparent: true
							}}
						/>
						<Stack.Screen
							name='colorPicker'
							options={{
								headerTitle: 'Choose a Color',
								presentation:
									Platform.OS === 'ios'
										? 'formSheet'
										: 'modal',
								animation:
									Platform.OS === 'ios'
										? null
										: 'slide_from_bottom',
								sheetAllowedDetents: [0.5, 1],
								sheetGrabberVisible: true,
								headerTransparent: true
							}}
						/>

						<Stack.Screen
							name='(currencies)/index'
							options={{ headerTitle: 'Select a currency' }}
						/>
					</Stack>
				</ListCreationProvider>
			</TinyBaseProvider>
		</CurrencyProvider>
	)
}
