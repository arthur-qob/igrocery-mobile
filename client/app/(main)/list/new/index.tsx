import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { Input } from '@/components/Input'
import { Text } from '@/components/ThemedText'
import IconCircle from '@/components/ui/IconCircle'
import Separator from '@/components/ui/Separator'
import { useColors } from '@/constants/Colors'
import { Href, useRouter } from 'expo-router'
import React, { useMemo, useState } from 'react'
import { Platform, View } from 'react-native'

const isValidUUID = (id: string | null) => {
	if (!id) return false

	const uuidRegex =
		/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

	return uuidRegex.test(id)
}

export default function NewListScreen() {
	const { staticColors } = useColors()

	const router = useRouter()

	const [listId, setListId] = useState<string>('')

	const isValidListId = useMemo(() => isValidUUID(listId), [listId])

	const handleJoinList = () => {}

	const handleDismissTo = (screen: Href) => {
		if (router.canDismiss()) router.dismiss()

		setTimeout(() => {
			router.push(screen)
		}, 100)
	}

	return (
		<Div style={{ paddingTop: Platform.OS === 'ios' ? 0 : 25, gap: 35 }}>
			<View
				style={{
					alignItems: 'center',
					gap: 20
				}}>
				<IconCircle
					iconName='person.2.fill'
					backgroundColor={staticColors.tintColor}
				/>
				<Text type='title'>Shared Lists</Text>
				<Text
					type='defaultSemiBold'
					style={{
						color: 'gray',
						textAlign: 'center'
					}}>
					Create shared lists and collaborate dynamically together
					with friends and family
				</Text>
			</View>

			<View
				style={{
					gap: 20
				}}>
				<Button
					title='Create new list'
					onPress={() => handleDismissTo('/list/new/create')}
				/>
				<Separator text='or join existing' />
				<Input
					variant='ghost'
					placeholder='Enter a list code'
					value={listId}
					onChangeText={(value) => setListId(value)}
				/>
				<Button
					title='Join list'
					disabled={!isValidListId}
					onPress={handleJoinList}
				/>
				<Button
					variant='text'
					title='Scan QR code'
					onPress={() => handleDismissTo('/list/new/scan')}
				/>
			</View>
		</Div>
	)
}
