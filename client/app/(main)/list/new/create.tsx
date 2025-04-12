import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { Input } from '@/components/Input'
import { Text } from '@/components/ThemedText'
import { colors, emojies, useColors } from '@/constants/Colors'
import { useListCreation } from '@/contexts/ListCreationContext'
import { useAddListCallback } from '@/stores/persistence/ListsStore'
import { Href, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

export default function CreateScreen() {
	const [listTitle, setListTitle] = useState('')

	const [listDescription, setListDescription] = useState('')

	const { selectedColor, selectedEmoji, setSelectedColor, setSelectedEmoji } =
		useListCreation()

	const router = useRouter()

	const useAddList = useAddListCallback()

	const goTo = (screen: Href) => {
		router.push(screen)
	}

	useEffect(() => {
		setSelectedEmoji(emojies[emojies.indexOf('🛒')])
		setSelectedColor(colors[colors.indexOf('rgb(10, 132, 255)')])

		return () => {
			setSelectedEmoji('')
			setSelectedColor('')
		}
	}, [])

	const handleCreateNewList = () => {
		if (!listTitle) return

		const listId = useAddList(
			listTitle,
			listDescription,
			selectedEmoji,
			selectedColor
		)

		router.replace({
			pathname: '/list/[listId]',
			params: { listId }
		})
	}

	const styles = StyleSheet.create({
		pickerBtns: {
			width: 35,
			aspectRatio: 1 / 1,
			borderWidth: 3,
			borderColor: selectedColor,
			borderRadius: '100%',
			justifyContent: 'center',
			alignItems: 'center'
		},
		color: {
			width: '80%',
			aspectRatio: 1 / 1,
			backgroundColor: selectedColor,
			borderRadius: '100%'
		}
	})

	return (
		<Div style={{ paddingTop: 0 }}>
			<View
				style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
				<Input
					variant='clean'
					width={'75%'}
					size='lg'
					placeholder='List title'
					inputStyle={{ fontSize: 32 }}
					onChangeText={setListTitle}
				/>

				<TouchableOpacity
					onPress={() => goTo('/emojiPicker')}
					style={styles.pickerBtns}>
					<Text style={{ fontSize: 20 }}>{selectedEmoji}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => goTo('/colorPicker')}
					style={styles.pickerBtns}>
					<View style={styles.color} />
				</TouchableOpacity>
			</View>

			<Input
				variant='ghost'
				width={'100%'}
				placeholder='Description (optional)'
				onChangeText={setListDescription}
			/>

			<Button
				variant='text'
				title='Create List'
				disabled={!listTitle}
				onPress={handleCreateNewList}
			/>
		</Div>
	)
}
