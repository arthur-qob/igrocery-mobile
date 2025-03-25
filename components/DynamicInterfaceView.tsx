import { Colors } from '@/constants/Colors'
import { useTheme } from '@/contexts/ThemeContext'
import { ReactNode } from 'react'
import {
	KeyboardAvoidingView,
	ScrollView,
	ViewProps,
	ScrollViewProps,
	KeyboardAvoidingViewProps,
	Platform,
	PlatformColor,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

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
	const { currentTheme } = useTheme()

	const backgroundColor = (
		Platform.OS === 'ios'
			? PlatformColor('systemBackground')
			: Colors[currentTheme as keyof typeof Colors].background
	) as string

	const baseStyle: ViewStyle = {
		flex: 1,
		borderWidth: 0,
	}

	const styles = StyleSheet.flatten({
		mainContainer: [
			baseStyle,
			{
				paddingHorizontal: 20,
				paddingTop: 150,
				backgroundColor,
			},
			style,
		],
		general: [{ flex: 1, backgroundColor: 'transparent' }], // Apply flex:1 here
	})

	return (
		<SafeAreaProvider style={styles.general}>
			<SafeAreaView style={styles.general}>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
								{ overflow: 'hidden' },
							]}>
							{children}
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

export { DynamicInterfaceView as Div }
