import { Div } from '@/components/DynamicInterfaceView'
import { Text } from '@/components/ThemedText'
import IconCircle from '@/components/ui/IconCircle'
import { backgroundColors, emojies, useColors } from '@/constants/Colors'
import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

export default function NewListScreen() {
	const { staticColors } = useColors()

	return (
		<Div style={{ paddingTop: 0 }}>
			<View
				style={{
					alignItems: 'center',
					gap: 20
				}}>
				<IconCircle
					iconName='person.2.fill'
					backgroundColor={staticColors.tintColor}
				/>
				<Text type='subtitle'>Shared Lists</Text>
				<Text
					type='defaultSemiBold'
					style={styles.subtitle}>
					Create shared lists and collaborate dynamically together
				</Text>
			</View>
		</Div>
	)
}

const styles = StyleSheet.create({
	subtitle: {}
})
