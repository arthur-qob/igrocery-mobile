import { Div } from '@/components/DynamicInterfaceView'
import { Text } from '@/components/ThemedText'
import IconSymbol from '@/components/ui/IconSymbol'
import * as Haptics from 'expo-haptics'
import useListContent from '@/hooks/useListContent'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useMemo, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'
import {
	useListProductCell,
	useListProductIds
} from '@/stores/persistence/ListStore'
import { Button } from '@/components/Button'
import ListProductItem from '@/components/ListProductItem'
import { useCurrencies } from '@/contexts/CurrencyContext'

export default function ListScreen() {
	const { listId } = useLocalSearchParams() as { listId: string }

	const router = useRouter()

	const listContent = useListContent(listId)

	const listProducts = useListProductIds(listId)

	const listTotalAmount = useMemo(() => {
		let total = 0

		listProducts.forEach((productId) => {
			const [price] = useListProductCell(listId, productId, 'price')
			total += price
		})

		return total
	}, [listProducts])

	const { selectedCurrency } = useCurrencies().context

	const newProductHref = {
		pathname: '/list/[listId]/product/new',
		params: { listId }
	} as const

	const [headerTitle, setHeaderTitle] = useState<string>('')

	useEffect(() => {
		if (listContent.title && listContent.emoji) {
			setHeaderTitle(`${listContent.emoji} ${listContent.title}`)
		}
	}, [listContent])

	return (
		<>
			<Stack.Screen
				options={{
					headerTitle: headerTitle,
					headerRight: () => (
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center'
							}}>
							<TouchableOpacity
								onPress={() => {
									if (process.env.EXPO_OS === 'ios') {
										Haptics.impactAsync(
											Haptics.ImpactFeedbackStyle.Medium
										)
									}
									// router.push({
									// 	pathname: '/list/[listId]/share',
									// 	params: { listId }
									// })
								}}
								style={{ padding: 8 }}>
								<IconSymbol
									name='square.and.arrow.up'
									color={'#007AFF'}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									if (process.env.EXPO_OS === 'ios') {
										Haptics.impactAsync(
											Haptics.ImpactFeedbackStyle.Medium
										)
									}
									// router.push({
									// 	pathname: '/list/[listId]/edit',
									// 	params: { listId }
									// })
								}}
								style={{ padding: 8 }}>
								<IconSymbol
									name='square.and.pencil'
									color={'#007AFF'}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									if (process.env.EXPO_OS === 'ios') {
										Haptics.impactAsync(
											Haptics.ImpactFeedbackStyle.Medium
										)
									}
									// router.push(newProductHref);
								}}
								style={{ paddingLeft: 8 }}>
								<IconSymbol
									name='plus'
									color={'#007AFF'}
								/>
							</TouchableOpacity>
						</View>
					)
				}}
			/>
			<View
				style={{
					marginTop: 175,
					width: 'auto',
					paddingHorizontal: 20
				}}>
				<Text type='title'>{`Total Amount: ${selectedCurrency.symbol} ${listTotalAmount}`}</Text>
			</View>
			<Animated.FlatList
				data={listProducts}
				renderItem={({ item: productId }) => (
					<ListProductItem
						listId={listId}
						productId={productId}
					/>
				)}
				contentContainerStyle={{
					paddingTop: 12
				}}
				contentInsetAdjustmentBehavior='automatic'
				ListHeaderComponent={() =>
					listContent.description ? (
						<Text
							style={{
								paddingHorizontal: 16,
								fontSize: 14,
								color: 'gray'
							}}>
							{listContent.description}
						</Text>
					) : null
				}
				ListEmptyComponent={() => (
					<Div
						style={{
							alignItems: 'center',
							gap: 10,
							paddingTop: 100
						}}>
						<Button
							variant='text'
							title='Add the first item to this list'
							onPress={() => {
								if (process.env.EXPO_OS === 'ios') {
									Haptics.impactAsync(
										Haptics.ImpactFeedbackStyle.Medium
									)
								}

								router.push(newProductHref)
							}}
						/>
					</Div>
				)}
			/>
		</>
	)
}
