import { useColors } from '@/constants/Colors'
import { Platform, PlatformColor, StyleSheet } from 'react-native'

const useStyles = () => {
	const { themedColors, staticColors } = useColors()

	const backgroundColor = themedColors.background as any

	const styles = StyleSheet.create({
		mainContainer: {
			backgroundColor: 'transparent',
			paddingTop: Platform.OS === 'ios' ? 40 : 100,
			display: 'flex',
			flexDirection: 'column',
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
		formContainer: {
			backgroundColor: themedColors.panel,
			borderWidth: 1,
			borderColor: themedColors.panelBorder,
			borderRadius: 10,
			paddingVertical: 30,
			paddingHorizontal: 20,
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			gap: 20
		},
		codeDigits: {
			width: 40,
			height: 50,
			fontSize: 20,
			color: themedColors.text,
			textAlign: 'center',
			borderWidth: 1,
			borderColor: themedColors.text,
			borderRadius: 10
		},
		errorsContainer: {
			width: 'auto',
			borderRadius: 10,
			padding: 20,
			backgroundColor:
				Platform.OS === 'ios'
					? PlatformColor('systemRed')
					: staticColors.danger
		},
		errors: {
			fontWeight: 'semibold',
			fontSize: 20
		}
	})

	return styles
}

export default useStyles
