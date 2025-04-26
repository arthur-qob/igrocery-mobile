import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { ListsTable } from '@/components/ListsTable'
import { Text } from '@/components/ThemedText'
import { useColors } from '@/constants/Colors'
import { useListsIds } from '@/stores/persistence/ListsStore'
import { useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native'

export default function HomeScreen() {
	const router = useRouter()

	const { user } = useUser()

	const userListsIds = useListsIds()

	console.log(`Lists IDs: ${userListsIds}`)

	const [loadingScreen, setLoadingScreen] = useState(true)

	setTimeout(() => {
		setLoadingScreen(false)
	}, 1000)

	const { themedColors, staticColors } = useColors()

	const renderLoading = loadingScreen && Platform.OS === 'android'

	const renderEmptyList = (
		<>
			<Button
				variant='icon-button'
				title='Create your first list'
				icon='cart'
				style={{ marginTop: 50 }}
				onPress={() => {
					setTimeout(
						() => {
							setLoadingScreen(false)
							router.push('/list/new/create')
						},
						Platform.OS === 'android' ? 1000 : 0
					)

					setLoadingScreen(true)
				}}
			/>
		</>
	)

	const styles = StyleSheet.create({
		title: {
			fontSize: 35
		},
		username: {
			fontWeight: 'bold'
		},
		listsContainer: {
			marginTop: 50,
			flexDirection: 'column',
			backgroundColor:
				userListsIds.length > 1 ? themedColors.panel : 'transparent',
			borderRadius: userListsIds.length > 1 ? 10 : 0
		}
	})

	return renderLoading ? (
		<View
			style={{
				backgroundColor: themedColors.background,
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center'
			}}>
			<ActivityIndicator
				size='large'
				color={themedColors.text}
			/>
		</View>
	) : (
		<>
			<Div style={{ paddingTop: Platform.OS === 'ios' ? 50 : 100 }}>
				<Text style={styles.title}>
					Welcome,{' '}
					<Text style={[styles.title, styles.username]}>
						{user?.firstName}
					</Text>
					!
				</Text>

				{userListsIds.length > 0 ? (
					<View style={styles.listsContainer}>
						{userListsIds.map((listId, index) => (
							<ListsTable
								key={index}
								listId={listId}
								rightContentStyle={{
									borderBottomColor:
										index > 0 && index < userListsIds.length
											? themedColors.separator
											: 'transparent'
								}}
							/>
						))}
					</View>
				) : (
					renderEmptyList
				)}
			</Div>
		</>
	)
}
