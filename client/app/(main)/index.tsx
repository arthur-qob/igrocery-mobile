import { Div } from '@/components/DynamicInterfaceView'
import { Text } from '@/components/ThemedText'
import { useUser } from '@clerk/clerk-expo'
import { useColors } from '@/constants/Colors'
import IconSymbol from '@/components/ui/IconSymbol'
import { Tabs } from 'expo-router'
import {
	Platform,
	PlatformColor,
	Pressable,
	StyleSheet,
	View
} from 'react-native'

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

	const testContainers = StyleSheet.create({
		containers: {
			borderRadius: 10
		},
		container0: {
			backgroundColor: 'rgb(10, 132, 255)',
			height: 100,
			width: '100%'
		},
		container1: {
			backgroundColor: 'rgb(10, 122, 245)',
			height: 100,
			width: '100%'
		},
		container2: {
			backgroundColor: 'rgb(10, 112, 235)',
			height: 100,
			width: '100%'
		},
		container3: {
			backgroundColor: 'rgb(10, 102, 225)',
			height: 100,
			width: '100%'
		},
		container4: {
			backgroundColor: 'rgb(10, 92, 215)',
			height: 100,
			width: '100%'
		},
		container5: {
			backgroundColor: 'rgb(10, 82, 205)',
			height: 100,
			width: '100%'
		},
		container6: {
			backgroundColor: 'rgb(10, 72, 195)',
			height: 100,
			width: '100%'
		}
	})

	const containers = [1, 2, 3, 4, 5, 6, 7]

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
				}}>
				{containers.map((_, index) => {
					const container = ('container' +
						index.toString()) as keyof typeof testContainers
					return (
						<View
							key={index}
							style={[
								testContainers[container],
								testContainers.containers
							]}></View>
					)
				})}
			</View>
		</Div>
	)
}
