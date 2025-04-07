import { Div } from '@/components/DynamicInterfaceView'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/contexts/ThemeContext'
import { ActivityIndicator, Platform, PlatformColor } from 'react-native'

export default function LoadingScreen() {
	const { currentTheme } = useTheme()

	const themeColors = Colors[currentTheme as keyof typeof Colors]

	const spinnerColor =
		Platform.OS === 'ios' ? PlatformColor('label') : themeColors.text

	return (
		<Div
			style={{
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
			<ActivityIndicator
				size='large'
				color={spinnerColor}
			/>
		</Div>
	)
}
