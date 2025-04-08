import IconSymbol from '@/components/ui/IconSymbol'
import { Stack, useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'

export default function MainLayout() {
	const router = useRouter()

	return (
		<Stack
			screenOptions={{
				headerShown: false
			}}>
			<Stack.Screen name='(tabs)' />
			<Stack.Screen
				name='(users)/[user]'
				options={{
					presentation: 'modal',
					headerShown: true,
					headerTransparent: true,
					headerTitle: '',
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.back()}>
							<IconSymbol
								name='chevron.down'
								color='white'
							/>
						</TouchableOpacity>
					)
				}}
			/>
			<Stack.Screen
				name='list/new/index'
				options={{
					presentation: 'modal',
					headerShown: true,
					headerTransparent: true,
					headerTitle: '',
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.back()}>
							<IconSymbol
								name='chevron.down'
								color='white'
							/>
						</TouchableOpacity>
					)
				}}
			/>
		</Stack>
	)
}
