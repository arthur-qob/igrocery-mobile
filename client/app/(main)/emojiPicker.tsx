import * as Haptics from 'expo-haptics'
import { emojies } from '@/constants/Colors'
import { useListCreation } from '@/contexts/ListCreationContext'
import { useRouter } from 'expo-router'
import React from 'react'
import { FlatList, Pressable, Text } from 'react-native'

export default function EmojiPickerScreen() {
	const { setSelectedEmoji } = useListCreation()

	const router = useRouter()

	const handleEmojiSelect = (emoji: string) => {
		setSelectedEmoji(emoji)

		router.back()
	}

	return (
		<FlatList
			data={emojies}
			renderItem={({ item }) => (
				<Pressable
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center'
					}}
					onPress={() => {
						if (process.env.EXPO_OS === 'ios') {
							Haptics.impactAsync(
								Haptics.ImpactFeedbackStyle.Medium
							)
						}
						handleEmojiSelect(item)
					}}>
					<Text style={{ fontSize: 40 }}>{item}</Text>
				</Pressable>
			)}
			numColumns={5}
			keyExtractor={(item) => item}
			automaticallyAdjustContentInsets
			contentInsetAdjustmentBehavior='automatic'
			contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
		/>
	)
}
