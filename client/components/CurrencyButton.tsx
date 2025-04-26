import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from './ThemedText'
import { useColors } from '@/constants/Colors'
import { useRouter } from 'expo-router'
import { useCurrencies } from '@/contexts/CurrencyContext'
import IconSymbol from './ui/IconSymbol'

export default function CurrencyButton() {
	const { selectedCurrency } = useCurrencies().context

	const router = useRouter()

	const { staticColors, themedColors } = useColors()

	const styles = StyleSheet.create({
		currencyBtn: {
			flexDirection: 'row',
			width: '100%',
			justifyContent: 'space-between',
			alignItems: 'center',
			backgroundColor: themedColors.panel,
			padding: 20,
			borderRadius: 10
		},
		currencyBtnContent: { flexDirection: 'row', width: '85%' },
		separator: {
			width: '100%',
			height: 1,
			backgroundColor: themedColors.separator,
			marginVertical: 5
		}
	})
	return (
		<TouchableOpacity
			onPress={() => router.push('/(currencies)')}
			style={styles.currencyBtn}>
			<View style={styles.currencyBtnContent}>
				<Text>{selectedCurrency.name}</Text>
			</View>
			<Text
				style={{
					color: 'gray',
					fontSize: 20,
					alignSelf: 'flex-end'
				}}>
				{selectedCurrency.symbol}
			</Text>
			<IconSymbol
				name='chevron.right'
				color={themedColors.separator}
				size={20}
			/>
		</TouchableOpacity>
	)
}
