import React from 'react'
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { Text } from '../ThemedText'

interface SeparatorProps {
	text?: string
	textStyle?: TextStyle
	containerStyle?: ViewStyle
}

const Separator: React.FC<SeparatorProps> = ({
	text,
	textStyle,
	containerStyle
}) => {
	return (
		<View style={[styles.separator, containerStyle]}>
			<View style={styles.lines} />
			<Text style={[styles.text, textStyle]}>{text}</Text>
			<View style={styles.lines} />
		</View>
	)
}

const styles = StyleSheet.create({
	separator: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16
	},
	lines: {
		flex: 1,
		height: 1,
		backgroundColor: 'rgba(100, 100, 100, 0.5)'
	},
	text: { color: 'gray' }
})

export default Separator
