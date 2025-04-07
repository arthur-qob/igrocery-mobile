import { Div } from '@/components/DynamicInterfaceView'
import { Text } from '@/components/ThemedText'
import IconSymbol from '@/components/ui/IconSymbol'
import { useUser } from '@clerk/clerk-expo'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { Alert, TouchableOpacity } from 'react-native'

export function UserScreen() {
	const { userId } = useLocalSearchParams()

	const { user } = useUser()

	const router = useRouter()

	return (
		<Div>
			<Text>{user?.firstName}</Text>
			<Text>{user?.primaryEmailAddress?.emailAddress}</Text>
		</Div>
	)
}

export default UserScreen
