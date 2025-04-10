import { colors } from '@/constants/Colors'
import { useListCreation } from '@/contexts/ListCreationContext'
import { useRouter } from 'expo-router'
import React from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'

export default function ColorPickerScreen() {
	const { setSelectedColor } = useListCreation()

	const router = useRouter()

	const handleColorSelect = (color: string) => {
		setSelectedColor(color)

		router.back()
	}

	return (
		<FlatList
			data={colors}
			renderItem={({ item }) => (
				<Pressable
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center'
					}}
					onPress={() => handleColorSelect(item)}>
					<View
						style={{
							width: 50,
							aspectRatio: 1 / 1,
							backgroundColor: item,
							borderRadius: '100%',
							margin: 10
						}}
					/>
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
