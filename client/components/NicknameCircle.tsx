import { useColors } from '@/constants/Colors'
import { Text } from './ThemedText'
import { StyleSheet } from 'react-native'

export const NicknameCircle = ({
	nickname,
	color,
	index = 0,
	isEllipsis = false
}: {
	nickname: string
	color: string
	index?: number
	isEllipsis?: boolean
}) => {
	const { themedColors } = useColors()

	const styles = StyleSheet.create({
		nicknameCircle: {
			fontSize: 12,
			color: 'white',
			borderWidth: 1,
			borderColor: 'white',
			borderRadius: 16,
			padding: 1,
			width: 24,
			height: 24,
			textAlign: 'center',
			lineHeight: 20
		},
		ellipsisCircle: {
			lineHeight: 0,
			marginLeft: -6
		}
	})

	return (
		<Text
			type='defaultSemiBold'
			style={[
				styles.nicknameCircle,
				isEllipsis && styles.ellipsisCircle,
				{
					backgroundColor: color,
					borderColor: themedColors.text,
					marginLeft: index > 0 ? -6 : 0
				}
			]}>
			{isEllipsis ? '...' : nickname[0].toUpperCase()}
		</Text>
	)
}
