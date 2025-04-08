import { Div } from '@/components/DynamicInterfaceView'
import { Text } from '@/components/ThemedText'
import { useUser } from '@clerk/clerk-expo'
import { StyleSheet, View } from 'react-native'

export default function HomeScreen() {
	const { user } = useUser()

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
					flexDirection: 'column',
					gap: 20
				}}></View>
		</Div>
	)
}
