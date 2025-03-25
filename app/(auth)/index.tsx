import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { BackgroundElement } from '@/components/ui/BackgroundElement'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/contexts/ThemeContext'
import { useRouter } from 'expo-router'
import { Platform, PlatformColor, StyleSheet, View, Text } from 'react-native'

export default function WelcomeScreen() {
	const router = useRouter()

	const { currentTheme } = useTheme()

	const backgroundColor =
		Platform.OS === 'ios'
			? PlatformColor('systemBackground')
			: Colors[currentTheme as keyof typeof Colors].background

	const styles = StyleSheet.create({
		mainContainer: {
			backgroundColor: 'transparent',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			gap: 20,
		},
		text: {
			color: Colors[currentTheme as keyof typeof Colors].text,
		},
		title: {
			fontSize: Platform.OS === 'ios' ? 70 : 65,
			textAlign: 'center',
		},
		appName: {
			fontWeight: 'bold',
		},
		btnsContainer: {
			marginTop: 250,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			gap: 20,
		},
	})

	return (
		<BackgroundElement backgroundColor={backgroundColor}>
			<Div style={styles.mainContainer}>
				<Text style={[styles.title, styles.text]}>
					Welcome to <Text style={styles.appName}>iGrocery</Text>
				</Text>
				<View style={styles.btnsContainer}>
					<Button
						variant='filled'
						width='100%'
						title='Sign In'
						onPress={() => {
							router.push('/signin')
						}}
					/>
					<Button
						variant='outlined'
						width='100%'
						title='Sign Up'
						onPress={() => {
							router.push('/signup')
						}}
					/>
				</View>
			</Div>
		</BackgroundElement>
	)
}
