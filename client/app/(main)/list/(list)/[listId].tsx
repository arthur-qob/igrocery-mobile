import { Text } from '@/components/ThemedText'
import { useListValue } from '@/stores/persistence/ListStore'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect } from 'react'
import { FlatList } from 'react-native'

export default function ListScreen() {
	const { listId } = useLocalSearchParams() as { listId: string }
	const nav = useNavigation()

	const listContent = {
		id: listId,
		title: useListValue(listId, 'title'),
		description: useListValue(listId, 'description'),
		createdAt: useListValue(listId, 'createdAt'),
		updateddAt: useListValue(listId, 'updatedAt')
	}

	useEffect(() => {
		if (!listId) return

		nav.setOptions({
			headerTitle: listContent.title
		})
	}, [listId])

	return (
		<>
			<FlatList
				data={listId}
				renderItem={({ item }) => <Text>{item}</Text>}
			/>
		</>
	)
}
