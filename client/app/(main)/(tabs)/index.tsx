import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { Text } from '@/components/ThemedText'
import IconSymbol from '@/components/ui/IconSymbol'
import { useListsIds } from '@/stores/persistence/ListsStore'
import { useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { FlatList, StyleSheet, View } from 'react-native'

export default function HomeScreen() {
	const { user } = useUser()

	const userLists = useListsIds()

	const router = useRouter()

	const renderEmptyList = (
		<Div>
			<IconSymbol name='cart' />
			<Button
				variant='text'
				title='Create your first list'
				onPress={() => router.push('/list/new/create')}
			/>
		</Div>
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
		<Div>
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
					contentInsetAdjustmentBehavior='automatic'
					nestedScrollEnabled={true}
					scrollEnabled={false}
					data={userLists}
					renderItem={({ item }) => (
						<Button
							variant='text'
							title={item}
							onPress={() =>
								router.push({
									pathname: '/list/[listId]',
									params: { listId: item }
								})
							}
						/>
					)}
				/>
			</View>
		</Div>
	)
}
