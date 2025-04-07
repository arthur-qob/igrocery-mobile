import { useColors } from '@/constants/Colors'
import { Text } from '@/components/ThemedText'
import { StyleSheet, Switch, View } from 'react-native'
import { useTheme } from '@/contexts/ThemeContext'

export const ThemeSelector = () => {
	const { currentTheme, setThemeOpt, themes, themeOpt } = useTheme()

	const { themedColors, staticColors } = useColors()

	const styles = StyleSheet.create({
		themeSelectorContainer: {
			backgroundColor: themedColors.panel,
			borderRadius: 10,
			padding: 10
		},
		panelRows: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			padding: 10
		},
		separator: {
			width: '100%',
			height: 1,
			backgroundColor: themedColors.separator,
			marginVertical: 5
		}
	})

	return (
		<>
			<Text>Theme</Text>
			<View style={styles.themeSelectorContainer}>
				{themes.map((theme, index) => {
					return (
						<View key={index}>
							<View style={styles.panelRows}>
								<Text>
									{theme.charAt(0).toUpperCase() +
										theme.slice(1)}
								</Text>
								<Switch
									onValueChange={() => setThemeOpt(theme)}
									value={themeOpt === theme}
								/>
							</View>
							{theme !== themes[themes.length - 1] && (
								<View style={styles.separator} />
							)}
						</View>
					)
				})}
			</View>
		</>
	)
}
