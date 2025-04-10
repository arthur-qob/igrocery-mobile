import { Text } from '@/components/ThemedText'
import { ListCreationProvider } from '@/contexts/ListCreationContext'
import { useTheme } from '@/contexts/ThemeContext'
import ListsStore from '@/stores/persistence/ListsStore'
import { BlurTint, BlurView } from 'expo-blur'
import { Stack, useRouter } from 'expo-router'
import { Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { Provider as TinyBaseProvider } from 'tinybase/ui-react'

export default function MainLayout() {
	const router = useRouter()

	const { currentTheme } = useTheme()

	const contrastTheme = currentTheme === 'light' ? 'dark' : 'light'

	const blurIntensity = Platform.OS === 'android' ? 10 : 50

	return (
		<TinyBaseProvider>
			<ListsStore />
			<ListCreationProvider>
				<Stack
					screenOptions={{
						headerBackground: () => (
							<BlurView
								intensity={blurIntensity}
								tint={
									Platform.OS === 'android'
										? (`systemChromeMaterial${contrastTheme.replace(contrastTheme.charAt(0), contrastTheme.charAt(0).toUpperCase())}` as BlurTint)
										: (`systemChromeMaterial${currentTheme.replace(currentTheme.charAt(0), currentTheme.charAt(0).toUpperCase())}` as BlurTint)
								}
								experimentalBlurMethod='dimezisBlurView'
								style={{
									...StyleSheet.absoluteFillObject,
									overflow: 'hidden',
									backgroundColor: 'transparent'
								}}
							/>
						)
					}}>
					<Stack.Screen
						name='(tabs)'
						options={{
							headerShown: false,
							headerTitle: 'Home'
						}}
					/>
					<Stack.Screen
						name='(users)/[user]'
						options={{
							presentation:
								Platform.OS === 'ios' ? 'formSheet' : 'modal',
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
								Platform.OS === 'ios' ? 'formSheet' : 'modal',
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
								<TouchableOpacity onPress={() => router.back()}>
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
					<Stack.Screen
						name='emojiPicker'
						options={{
							headerTitle: 'Choose an Emoji',
							presentation:
								Platform.OS === 'ios' ? 'formSheet' : 'modal',
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
								Platform.OS === 'ios' ? 'formSheet' : 'modal',
							animation:
								Platform.OS === 'ios'
									? null
									: 'slide_from_bottom',
							sheetAllowedDetents: [0.5, 1],
							sheetGrabberVisible: true,
							headerTransparent: true
						}}
					/>
				</Stack>
			</ListCreationProvider>
		</TinyBaseProvider>
	)
}
