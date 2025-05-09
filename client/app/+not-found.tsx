import { Link, Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

import { Text } from '@/components/ThemedText'
import { Div } from '@/components/DynamicInterfaceView'

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: 'Oops!' }} />
			<Div style={styles.container}>
				<Text type='title'>This screen doesn't exist.</Text>
				<Link
					href='/(main)/(tabs)'
					style={styles.link}>
					<Text type='link'>Go to home screen!</Text>
				</Link>
			</Div>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20
	},
	link: {
		marginTop: 15,
		paddingVertical: 15
	}
})
