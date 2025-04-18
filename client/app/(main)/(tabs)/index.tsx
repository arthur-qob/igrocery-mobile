import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { ListsTable } from '@/components/ListsTable'
import { Text } from '@/components/ThemedText'
import { useColors } from '@/constants/Colors'
import { useListsIds } from '@/stores/persistence/ListsStore'
import { useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { StyleSheet, View } from 'react-native'

export default function HomeScreen() {
	const router = useRouter()

	const { user } = useUser()

	const userListsIds = useListsIds()

	console.log(`Lists IDs: ${userListsIds}`)

	const renderEmptyList = (
		<>
			<Button
				variant='icon-button'
				title='Create your first list'
				icon='cart'
				style={{ marginTop: 50 }}
				onPress={() => router.push('/list/new/create')}
			/>
		</>
	)

	const { themedColors } = useColors()

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

	console.log(userListsIds.length)

	return (
		<>
			<Div style={{ paddingTop: 50 }}>
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
								rightContentStyle={
									index > 0 && index < userListsIds.length
										? {
												borderTopWidth: 0.5,
												borderTopColor:
													themedColors.border
											}
										: {}
								}
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
