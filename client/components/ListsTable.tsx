import React, { useEffect, useState } from 'react'
import { Text } from './ThemedText'
import {
	useListProductCount,
	useListUsersNicknames
} from '@/stores/persistence/ListStore'
import {
	ActivityIndicator,
	StyleSheet,
	TouchableOpacity,
	View,
	ViewStyle
} from 'react-native'
import { Link } from 'expo-router'
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
import { useListContent } from '@/hooks/useListContent'
import { NicknameCircle } from './NicknameCircle'

interface ListsTableProps {
	listId: string
	rightContentStyle?: ViewStyle
	leftContentStyle?: ViewStyle
}

export const ListsTable: React.FC<ListsTableProps> = ({
	listId,
	leftContentStyle,
	rightContentStyle
}) => {
	const [loading, setLoading] = useState(true)

	const { title, emoji, color } = useListContent({
		listId: listId,
		requiredFields: ['title', 'emoji', 'color']
	})

	useEffect(() => {
		console.log(
			`\nList title: ${title}\nList emoji: ${emoji}\nList color: ${color}`
		)

		if (title && emoji && color) {
			setLoading(false)
		}
	}, [title, emoji, color])

	let productCount = useListProductCount(listId) || 0

	let usersNicknames = useListUsersNicknames(listId)

	const deleteCallback = useDelListCallback(listId)

	const RightAction = (
		prog: SharedValue<number>,
		drag: SharedValue<number>
	) => {
		const styleAnimation = useAnimatedStyle(() => ({
			transform: [{ translateX: drag.value + 200 }]
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
		swipeable: {
			width: '100%',
			flexDirection: 'row',
			alignItems: 'center',
			gap: 8
		},
		mainContent: {
			width: '100%',
			height: '100%',
			flexDirection: 'row',
			alignItems: 'center',
			gap: 12
		},
		leftContent: {
			width: '20%',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			alignSelf: 'center',
			...leftContentStyle
		},
		rightContent: {
			flexDirection: 'row',
			flex: 1,
			paddingVertical: 20,
			justifyContent: 'space-between',
			borderBottomWidth: 0.5,
			borderBottomColor: themedColors.panel,
			...rightContentStyle
		},
		textContent: {
			flexDirection: 'column'
		},
		productCount: {
			fontSize: 12,
			color: 'gray'
		},
		rightAction: {
			width: 200,
			height: '100%',
			backgroundColor: staticColors.danger,
			alignItems: 'center',
			justifyContent: 'center'
		},
		nicknameContainer: {
			flexDirection: 'row',
			marginRight: 4
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
				<Link href={`/list/${listId}`}>
					<View
						style={[
							styles.swipeable,
							loading
								? {
										height: 40,
										justifyContent: 'center',
										alignItems: 'center'
									}
								: {}
						]}>
						{loading ? (
							<ActivityIndicator color={themedColors.text} />
						) : (
							<View style={styles.mainContent}>
								<View style={styles.leftContent}>
									<IconCircle
										emoji={emoji}
										backgroundColor={color}
									/>
								</View>
								<View style={styles.rightContent}>
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
										{usersNicknames.length > 1 && (
											<View
												style={
													styles.nicknameContainer
												}>
												{usersNicknames.length === 4
													? usersNicknames.map(
															(
																nickname,
																index
															) => (
																<NicknameCircle
																	key={index}
																	nickname={
																		nickname as string
																	}
																	color={
																		color
																	}
																	index={
																		index
																	}
																/>
															)
														)
													: usersNicknames.length > 4
														? usersNicknames
																.slice(0, 4)
																.map(
																	(
																		nickname,
																		index
																	) => (
																		<NicknameCircle
																			key={
																				index
																			}
																			nickname={
																				nickname as string
																			}
																			color={
																				color
																			}
																			index={
																				index
																			}
																			isEllipsis={
																				index ===
																				3
																			}
																		/>
																	)
																)
														: usersNicknames.map(
																(
																	nickname,
																	index
																) => (
																	<NicknameCircle
																		key={
																			index
																		}
																		nickname={
																			nickname as string
																		}
																		color={
																			color
																		}
																		index={
																			index
																		}
																	/>
																)
															)}
											</View>
										)}
									</View>
									<IconSymbol
										name='chevron.right'
										color={themedColors.inactiveColor}
										size={25}
										style={{ marginRight: 16 }}
									/>
								</View>
							</View>
						)}
					</View>
				</Link>
			</ReanimatedSwipeable>
		</Animated.View>
	)
}

export default ListsTable
