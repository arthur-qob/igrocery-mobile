import { useColors } from '@/constants/Colors'
import { useTheme } from '@/contexts/ThemeContext'
import { Children } from 'react'
import {
	Platform,
	Image,
	Dimensions,
	StyleSheet,
	View,
	ViewStyle
} from 'react-native'
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg'

interface BackgroundElementProps {
	backgroundColor?: string
	style?: ViewStyle
	children?: React.ReactNode
}

const BackgroundElement: React.FC<BackgroundElementProps> = ({
	backgroundColor,
	style,
	children
}) => {
	const { currentTheme } = useTheme()

	const { themedColors, staticColors } = useColors()

	const { width, height } = Dimensions.get('window')

	const opt = 2

	const currentBackgroundElementImg = require(
		`@/assets/images/background-element${String(opt)}.png`
	)

	const backgroundElementStyles = StyleSheet.create({
		backgroundElementImg: {
			position: 'absolute',
			top: -250,
			right: -300,
			width: width * 2,
			height: width * 2.2
		},
		svg: {
			position: 'absolute',
			top: -250,
			right: -300,
			display: 'flex',
			justifyContent: 'flex-end',
			alignItems: 'flex-end',
			borderRadius: width,
			shadowColor: staticColors.backgroundElement[opt].borderColor,
			shadowOffset: {
				width: 0,
				height: 0
			},
			shadowOpacity: 0.98,
			shadowRadius: -2,
			overflow: 'hidden'
		}
	})

	return (
		<View
			style={{
				backgroundColor,
				position: 'absolute',
				flex: 1,
				inset: 0,
				overflow: 'hidden',
				...style
			}}>
			{Platform.OS === 'ios' ? (
				<Svg
					height={width * 2}
					style={backgroundElementStyles.svg}
					width={width * 2}>
					<Defs>
						<RadialGradient
							id='grad'
							cx='50%'
							cy='40%' // Moves the bright center upwards
							r='80%' // Covers a larger area
						>
							<Stop
								offset='15%'
								stopColor={String(
									staticColors.backgroundElement[opt].color1
								)}
								stopOpacity='0'
							/>
							<Stop
								offset='45%'
								stopColor={String(
									staticColors.backgroundElement[opt].color2
								)}
								stopOpacity='0.25'
							/>
							<Stop
								offset='75%'
								stopColor={String(
									staticColors.backgroundElement[opt].color3
								)}
								stopOpacity='1'
							/>
						</RadialGradient>
					</Defs>
					<Rect
						height={width * 2}
						width={width * 2.5}
						fill='url(#grad)'
					/>
				</Svg>
			) : (
				<Image
					source={currentBackgroundElementImg}
					style={backgroundElementStyles.backgroundElementImg}
				/>
			)}
			{children}
		</View>
	)
}

export { BackgroundElement }
