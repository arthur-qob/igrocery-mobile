import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { Input } from '@/components/Input'
import { Text } from '@/components/ThemedText'
import { useColors } from '@/constants/Colors'
import { useListCreation } from '@/contexts/ListCreationContext'
import { Href, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

export default function CreateScreen() {
	const [listTitle, setListTitle] = useState('')

	const [description, setDescription] = useState('')

	const { selectedColor, selectedEmoji } = useListCreation()

	const [emoji, setEmoji] = useState(selectedEmoji)

	const [color, setColor] = useState(selectedColor)

	const styles = StyleSheet.create({
		pickerBtns: {
			width: 35,
			aspectRatio: 1 / 1,
			borderWidth: 3,
			borderColor: color,
			borderRadius: '100%',
			justifyContent: 'center',
			alignItems: 'center'
		},
		color: {
			width: '80%',
			aspectRatio: 1 / 1,
			backgroundColor: color,
			borderRadius: '100%'
		}
	})

	const router = useRouter()

	const goTo = (screen: Href) => {
		router.push(screen)
	}

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
				onChangeText={setDescription}
			/>

			<Button
				variant='text'
				title='Create List'
				disabled={!listTitle}
			/>
		</Div>
	)
}
