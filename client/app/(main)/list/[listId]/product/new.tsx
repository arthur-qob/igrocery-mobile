import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { Input } from '@/components/Input'
import { useCurrencies } from '@/contexts/CurrencyContext'
import { useAddListProductCallback } from '@/stores/persistence/ListStore'
import {
	Stack,
	useLocalSearchParams,
	useNavigation,
	useRouter
} from 'expo-router'
import React, { useLayoutEffect, useState } from 'react'

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

	return (
		<>
			<Div style={{ paddingTop: 20, gap: 20 }}>
				<Input
					variant='clean'
					placeholder='Item name'
					value={name}
					onChangeText={setName}
				/>
				<Input
					variant='clean'
					placeholder='Item quantity'
					keyboardType='numeric'
					value={quantity?.toString()}
					onChangeText={(text) => setQuantity(Number(text))}
				/>
				<Input
					variant='clean'
					placeholder={`Item price (${selectedCurrency.symbol})`}
					keyboardType='numeric'
					value={price?.toString()}
					onChangeText={(text) => setPrice(Number(text))}
				/>
				<Input
					variant='clean'
					placeholder='Item notes'
					value={notes}
					// onChangeText={setnotes}
				/>
			</Div>
		</>
	)
}
