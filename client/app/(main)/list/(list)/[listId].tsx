import { Text } from '@/components/ThemedText'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { FlatList } from 'react-native'

export default function ListScreen() {
	const router = useRouter()
	const { listId } = useLocalSearchParams() as { listId: string }

	return (
		<>
			<FlatList
				data={listId}
				renderItem={({ item }) => <Text>{item}</Text>}
			/>
		</>
	)
}
