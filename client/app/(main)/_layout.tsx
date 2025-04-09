import { Button } from '@/components/Button'
import { Text } from '@/components/ThemedText'
import IconSymbol from '@/components/ui/IconSymbol'
import StackHeader from '@/components/ui/StackHeader'
import { useColors } from '@/constants/Colors'
import { HeaderTitle } from '@react-navigation/elements'
import { Stack, useRouter } from 'expo-router'
import { Platform, TouchableOpacity } from 'react-native'

export default function MainLayout() {
	const router = useRouter()

	const { themedColors } = useColors()

	return (
		<Stack>
			<Stack.Screen
				name='(tabs)'
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name='(users)/[user]'
				options={{
					presentation: Platform.OS === 'ios' ? 'formSheet' : 'modal',
					animation:
						Platform.OS === 'ios' ? null : 'slide_from_bottom',
					sheetAllowedDetents: [0.5, 0.75, 1],
					sheetGrabberVisible: true,
					headerTransparent: true,
					headerTitle: ''
				}}
			/>
			<Stack.Screen
				name='list/new/index'
				options={{
					presentation: Platform.OS === 'ios' ? 'formSheet' : 'modal',
					animation:
						Platform.OS === 'ios' ? null : 'slide_from_bottom',
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
		</Stack>
	)
}
