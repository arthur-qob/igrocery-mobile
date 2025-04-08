import { useColors } from '@/constants/Colors'
import { useTheme } from '@/contexts/ThemeContext'
import { ReactNode } from 'react'
import {
	KeyboardAvoidingView,
	ScrollView,
	ViewProps,
	ScrollViewProps,
	KeyboardAvoidingViewProps,
	Platform,
	StyleSheet,
	View,
	ViewStyle
} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { BackgroundElement } from './ui/BackgroundElement'
import { useAuth } from '@clerk/clerk-expo'
import { BlurView } from 'expo-blur'
import { usePathname, useSegments } from 'expo-router'

type DynamicInterfaceViewProps = ViewProps &
	ScrollViewProps &
	KeyboardAvoidingViewProps & {
		children?: ReactNode
	}

const DynamicInterfaceView: React.FC<DynamicInterfaceViewProps> = ({
	children,
	style,
	...otherProps
}) => {
	const { themedColors } = useColors()

	const backgroundColor = themedColors.background

	const baseStyle: ViewStyle = {
		flex: 1,
		borderWidth: 0
	}

	const styles = StyleSheet.flatten({
		mainContainer: [
			baseStyle,
			{
				paddingHorizontal: 20,
				paddingTop: 150,
				backgroundColor
			},
			style
		],
		general: [{ flex: 1, zIndex: 1, backgroundColor: 'transparent' }]
	})

	const { isSignedIn } = useAuth()
	const route = '/' + useSegments().join(' / ')

	return (
		<>
			<SafeAreaProvider
				style={[
					styles.general,
					{
						backgroundColor: backgroundColor,
						position: 'relative',
						zIndex: 0
					}
				]}>
				<SafeAreaView style={styles.general}>
					{!isSignedIn ? (
						<>
							<BackgroundElement style={{ zIndex: 1 }} />
							<BlurView
								intensity={route !== '/(auth)' ? 50 : 0}
								experimentalBlurMethod='dimezisBlurView'
								style={{
									...StyleSheet.absoluteFillObject,
									overflow: 'hidden',
									backgroundColor: 'transparent',
									flex: 1,
									zIndex: 5
								}}>
								<KeyboardAvoidingView
									behavior={
										Platform.OS === 'ios'
											? 'padding'
											: 'height'
									}
									style={styles.general}>
									<ScrollView
										contentContainerStyle={{ flexGrow: 1 }} // Ensures children take full height
										automaticallyAdjustsScrollIndicatorInsets
										contentInsetAdjustmentBehavior='automatic'
										contentInset={{ bottom: 0 }}
										scrollIndicatorInsets={{ bottom: 0 }}
										{...otherProps}>
										<View
											style={[
												styles.mainContainer,
												{ overflow: 'hidden' }
											]}>
											{children}
										</View>
									</ScrollView>
								</KeyboardAvoidingView>
							</BlurView>
						</>
					) : (
						<KeyboardAvoidingView
							behavior={
								Platform.OS === 'ios' ? 'padding' : 'height'
							}
							style={styles.general}>
							<ScrollView
								contentContainerStyle={{ flexGrow: 1 }} // Ensures children take full height
								automaticallyAdjustsScrollIndicatorInsets
								contentInsetAdjustmentBehavior='automatic'
								contentInset={{ bottom: 0 }}
								scrollIndicatorInsets={{ bottom: 0 }}
								{...otherProps}>
								<View
									style={[
										styles.mainContainer,
										{ overflow: 'hidden' }
									]}>
									{children}
								</View>
							</ScrollView>
						</KeyboardAvoidingView>
					)}
				</SafeAreaView>
			</SafeAreaProvider>
		</>
	)
}

export { DynamicInterfaceView as Div }
