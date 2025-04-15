import {
	useListValue,
	useListProductCell,
	useDelListProductCallback
} from '@/stores/persistence/ListStore'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import * as Haptics from 'expo-haptics'
import Reanimated, {
	SharedValue,
	useAnimatedStyle
} from 'react-native-reanimated'
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import IconSymbol from './ui/IconSymbol'
import { Text } from './ThemedText'
import { useColors } from '@/constants/Colors'
import { useCurrencies } from '@/contexts/CurrencyContext'

export default function ListProductItem({
	listId,
	productId
}: {
	listId: string
	productId: string
}) {
	const router = useRouter()

	const [name] = useListProductCell(listId, productId, 'name')
	const [quantity] = useListProductCell(listId, productId, 'quantity')
	const [price] = useListProductCell(listId, productId, 'price')

	const { selectedCurrency } = useCurrencies().context

	const [color] = useListValue(listId, 'color')

	const [isPurchased, setIsPurchased] = useListProductCell(
		listId,
		productId,
		'isPurchased'
	)

	const deleteCallback = useDelListProductCallback(listId, productId)

	const RightAction = (
		prog: SharedValue<number>,
		drag: SharedValue<number>
	) => {
		const styleAnimation = useAnimatedStyle(() => {
			return {
				transform: [{ translateX: drag.value + 80 }]
			}
		})

		return (
			<TouchableOpacity
				onPress={() => {
					if (process.env.EXPO_OS === 'ios') {
						Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
					}

					deleteCallback()
				}}>
				<Reanimated.View style={[styleAnimation, styles.rightAction]}>
					<IconSymbol
						name='trash.fill'
						color='rgb(255, 255, 255)'
					/>
				</Reanimated.View>
			</TouchableOpacity>
		)
	}

	const { staticColors } = useColors()

	const styles = StyleSheet.create({
		swipeable: {
			flexGrow: 1,
			flexShrink: 1,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			gap: 8,
			paddingVertical: 8
		},
		rightAction: {
			width: 80,
			height: '100%',
			backgroundColor: staticColors.danger,
			alignItems: 'center',
			justifyContent: 'center'
		}
	})

	return (
		<ReanimatedSwipeable
			key={productId}
			friction={2}
			enableTrackpadTwoFingerGesture
			rightThreshold={40}
			renderRightActions={RightAction}
			overshootRight={false}
			enableContextMenu
			containerStyle={{
				paddingBottom: 12,
				paddingHorizontal: 16
			}}>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					gap: 10
				}}>
				<TouchableOpacity
					onPress={() => {
						if (process.env.EXPO_OS === 'ios') {
							Haptics.notificationAsync(
								Haptics.NotificationFeedbackType.Success
							)
						}

						setIsPurchased(!isPurchased)
					}}>
					<IconSymbol
						name={isPurchased ? 'checkmark.circle.fill' : 'circle'}
						size={28}
						color={color}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						router.push({
							pathname: '/list/[listId]/product/[productId]',
							params: { listId, productId }
						})
					}}
					style={styles.swipeable}>
					<Text
						type='defaultSemiBold'
						numberOfLines={1}
						ellipsizeMode='tail'
						style={{
							maxWidth: '95%',
							opacity: isPurchased ? 0.5 : 1,
							textDecorationLine: isPurchased
								? 'line-through'
								: 'none'
						}}>
						{name}
					</Text>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							gap: 20
						}}>
						<Text>{`x${quantity}`}</Text>
						<Text>{`${selectedCurrency.symbol} ${price}`}</Text>
					</View>
				</TouchableOpacity>
			</View>
		</ReanimatedSwipeable>
	)
}
