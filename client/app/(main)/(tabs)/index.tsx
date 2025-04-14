import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import ListItem from '@/components/ListItem'
import { Text } from '@/components/ThemedText'
import IconSymbol from '@/components/ui/IconSymbol'
import { useListsIds } from '@/stores/persistence/ListsStore'
import { useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { FlatList, StyleSheet, View } from 'react-native'

export default function HomeScreen() {
	const { user } = useUser()

	const userListsIds = useListsIds()

	console.log(`Lists IDs: ${userListsIds}`)

	const router = useRouter()

	const renderEmptyList = (
		<>
			<Button
				variant='icon-button'
				title='Create your first list'
				icon='cart'
				onPress={() => router.push('/list/new/create')}
			/>
		</>
	)

	const styles = StyleSheet.create({
		title: {
			fontSize: 35
		},
		username: {
			fontWeight: 'bold'
		}
	})

	return (
		<View style={{ paddingTop: 175, paddingHorizontal: 20 }}>
			<Text style={styles.title}>
				Welcome,{' '}
				<Text style={[styles.title, styles.username]}>
					{user?.firstName}
				</Text>
				!
			</Text>

			<View
				style={{
					marginTop: 50
				}}>
				<FlatList
					data={userListsIds}
					renderItem={({ item: listId }) => (
						<ListItem listId={listId} />
					)}
					ListEmptyComponent={renderEmptyList}
					contentInsetAdjustmentBehavior='automatic'
				/>
			</View>
		</View>
	)
}
