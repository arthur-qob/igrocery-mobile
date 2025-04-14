import React from 'react'
import { Text } from './ThemedText'
import {
	useListProductCount,
	useListUsersNicknames,
	useListValue
} from '@/stores/persistence/ListStore'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Link, useRouter } from 'expo-router'
import { useColors } from '@/constants/Colors'
import IconCircle from './ui/IconCircle'
import Animated, {
	SharedValue,
	useAnimatedStyle
} from 'react-native-reanimated'
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import Reanimated from 'react-native-reanimated'
import { useDelListCallback } from '@/stores/persistence/ListsStore'
import IconSymbol from './ui/IconSymbol'

export default function ListItem({ listId }: { listId: string }) {
	const router = useRouter()

	let [title] = useListValue(listId, 'title')
	if (!title || title.length === 0) {
		title = 'No list title'
	}

	let [emoji] = useListValue(listId, 'emoji')
	if (!emoji || emoji.length === 0) {
		emoji = '❌'
	}

	let [color] = useListValue(listId, 'color')
	if (!color || color.length === 0) {
		color = '❌'
	}

	let productCount = useListProductCount(listId) || 0

	let usersNicknames = useListUsersNicknames(listId)

	const deleteCallback = useDelListCallback(listId)

	console.log(`\nList title: ${title}\nList emoji: ${emoji}`)

	const RightAction = (
		prog: SharedValue<number>,
		darg: SharedValue<number>
	) => {
		const styleAnimation = useAnimatedStyle(() => ({
			transform: [{ translateX: darg.value + 200 }]
		}))

		return (
			<TouchableOpacity onPress={deleteCallback}>
				<Reanimated.View style={[styleAnimation, styles.rightAction]}>
					<IconSymbol
						name='trash.fill'
						color='rgb(255, 255, 255)'
					/>
				</Reanimated.View>
			</TouchableOpacity>
		)
	}

	const { themedColors, staticColors } = useColors()

	const styles = StyleSheet.create({
		listItem: {
			flexDirection: 'row',
			justifyContent: 'flex-start',
			alignItems: 'center',
			gap: 20,
			padding: 20,
			borderWidth: 1,
			borderColor: themedColors.border,
			borderRadius: 10,
			marginVertical: 10
		},
		swipeable: {
			width: '100%',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			borderBottomWidth: StyleSheet.hairlineWidth,
			borderBottomColor: themedColors.border,
			gap: 8,
			paddingHorizontal: 16,
			paddingVertical: 8
		},
		leftContent: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: 12,
			flexShrink: 1
		},
		textContent: {
			flexShrink: 1
		},
		productCount: {
			fontSize: 12,
			color: 'gray'
		},
		rightAction: {
			width: 200,
			height: 65,
			backgroundColor: staticColors.danger,
			alignItems: 'center',
			justifyContent: 'center'
		}
	})

	return (
		<Animated.View>
			<ReanimatedSwipeable
				key={listId}
				friction={2}
				enableTrackpadTwoFingerGesture
				rightThreshold={40}
				renderRightActions={RightAction}
				overshootRight={false}
				enableContextMenu>
				<Link href={{ pathname: '/list/[listId]', params: { listId } }}>
					<View style={styles.swipeable}>
						<View style={styles.leftContent}>
							<IconCircle
								emoji={emoji}
								backgroundColor={color}
							/>
							<View style={styles.textContent}>
								<Text
									type='defaultSemiBold'
									numberOfLines={2}>
									{title}
								</Text>
								<Text
									type='defaultSemiBold'
									style={styles.productCount}>
									{productCount} product
									{productCount == 1 ? '' : 's'}
								</Text>
							</View>
						</View>
					</View>
				</Link>
			</ReanimatedSwipeable>
		</Animated.View>
	)
}
