import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { Text } from '@/components/ThemedText'
import { useColors } from '@/constants/Colors'
import { useTheme } from '@/contexts/ThemeContext'
import { useRouter } from 'expo-router'
import { Platform, StyleSheet, View } from 'react-native'

export default function WelcomeScreen() {
	const router = useRouter()

	const { currentTheme } = useTheme()

	const { themedColors, staticColors } = useColors()

	const backgroundColor = themedColors.background

	const styles = StyleSheet.create({
		mainContainer: {
			backgroundColor: 'transparent',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			gap: 20
		},
		text: {
			color: themedColors.text
		},
		title: {
			fontSize: Platform.OS === 'ios' ? 70 : 65,
			textAlign: 'center'
		},
		appName: {
			fontWeight: 'bold'
		},
		btnsContainer: {
			marginTop: 250,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			gap: 20
		}
	})

	return (
		<Div style={styles.mainContainer}>
			<Text style={[styles.title, styles.text]}>
				Welcome to{' '}
				<Text style={[styles.title, styles.text, styles.appName]}>
					iGrocery
				</Text>
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
	)
}
