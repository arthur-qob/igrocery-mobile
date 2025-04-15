import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { Input } from '@/components/Input'
import { Text } from '@/components/ThemedText'
import IconSymbol from '@/components/ui/IconSymbol'
import { useColors } from '@/constants/Colors'
import { useCurrencies } from '@/contexts/CurrencyContext'
import { useAddListProductCallback } from '@/stores/persistence/ListStore'
import {
	Stack,
	useLocalSearchParams,
	useNavigation,
	useRouter
} from 'expo-router'
import React, { useLayoutEffect, useState } from 'react'
import { Platform, TouchableOpacity, View } from 'react-native'

export default function NewItemScreen() {
	const { listId } = useLocalSearchParams() as { listId: string }

	const [name, setName] = useState<string | undefined>(undefined)
	const [price, setPrice] = useState<number | undefined>(undefined)
	const [notes, setNotes] = useState<string | undefined>(undefined)
	const [quantity, setQuantity] = useState<number | undefined>(undefined)

	const itemValues = {
		name,
		price,
		notes,
		quantity
	}

	const router = useRouter()

	const addListProduct = useAddListProductCallback(listId)

	const handleCreateProduct = () => {
		if (Object.values(itemValues).some((value) => value === undefined))
			return

		addListProduct(name, quantity, price, notes)

		router.back()
	}

	const nav = useNavigation()

	useLayoutEffect(() => {
		nav.setOptions({
			headerTitle: 'Add product',
			headerRight: () => (
				<Button
					width={100}
					variant='text'
					title='Save'
					onPress={handleCreateProduct}
					disabled={Object.values(itemValues).some(
						(value) => value === undefined
					)}
				/>
			),
			headerLeft: () => (
				<Button
					width={100}
					variant='text'
					title='Cancel'
					onPress={() => router.back()}
				/>
			)
		})
	}, [nav, itemValues, handleCreateProduct])

	const { selectedCurrency } = useCurrencies().context

	const { themedColors } = useColors()

	return (
		<>
			<Div style={{ paddingTop: 20, gap: 20 }}>
				<Input
					variant='outlined'
					label='Name'
					placeholder='Potatoes'
					value={name}
					onChangeText={setName}
					autoFocus={true}
					returnKeyType='done'
				/>

				<Input
					variant='outlined'
					label='Price'
					placeholder={`(${selectedCurrency.symbol})`}
					keyboardType='numeric'
					value={price?.toString()}
					onChangeText={(text) => setPrice(Number(text))}
					onSubmitEditing={handleCreateProduct}
					returnKeyType='done'
				/>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						gap: 10
					}}>
					<Text style={{ fontSize: 20 }}>
						x{quantity || 0} {price || 0.0}
					</Text>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							alignSelf: 'flex-start'
						}}>
						<TouchableOpacity
							onPress={() =>
								setQuantity(Math.max(0, quantity || 1 - 1))
							}>
							<IconSymbol
								name='minus'
								size={20}
								color={themedColors.text}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => setQuantity(quantity || 0 + 1)}>
							<IconSymbol
								name='plus'
								size={20}
								color={themedColors.text}
							/>
						</TouchableOpacity>
					</View>
				</View>

				<Input
					variant='outlined'
					label='Notes'
					placeholder='Potatoes are good'
					textAlignVertical='top'
					value={notes}
					multiline={true}
					numberOfLines={4}
					inputStyle={{
						height: 100
					}}
					onChangeText={setNotes}
				/>
				{Platform.OS !== 'ios' && (
					<Button
						onPress={handleCreateProduct}
						disabled={!name}>
						Add product
					</Button>
				)}
			</Div>
		</>
	)
}
