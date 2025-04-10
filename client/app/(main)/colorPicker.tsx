import React from 'react'
import * as Haptics from 'expo-haptics'
import { useRouter } from 'expo-router'
import { FlatList, Pressable, View } from 'react-native'
import { colors } from '@/constants/Colors'
import { useListCreation } from '@/contexts/ListCreationContext'

export default function ColorPickerScreen() {
	const router = useRouter()
	const { setSelectedColor } = useListCreation()

	const handleColorSelect = (color: string) => {
		setSelectedColor(color)
		router.back()
	}

	return (
		<FlatList
			data={colors}
			renderItem={({ item }) => (
				<Pressable
					onPress={() => {
						if (process.env.EXPO_OS === 'ios') {
							Haptics.impactAsync(
								Haptics.ImpactFeedbackStyle.Medium
							)
						}
						handleColorSelect(item)
					}}
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center'
					}}>
					<View
						style={{
							width: 40,
							height: 40,
							borderRadius: 100,
							backgroundColor: item
						}}
					/>
				</Pressable>
			)}
			numColumns={5}
			keyExtractor={(item) => item}
			automaticallyAdjustContentInsets
			contentInsetAdjustmentBehavior='automatic'
			contentInset={{ bottom: 0 }}
			scrollIndicatorInsets={{ bottom: 0 }}
			contentContainerStyle={{
				padding: 16,
				gap: 16,
				paddingBottom: 100
			}}
		/>
	)
}
