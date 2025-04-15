import React from 'react'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Text } from './ThemedText'
import { useCurrencies } from '@/contexts/CurrencyContext'
import IconSymbol from './ui/IconSymbol'
import IconCircle from './ui/IconCircle'
import { useColors } from '@/constants/Colors'

interface CurrencyItemProps {
	currency: { [key: string]: string }
	separatorStyle?: ViewStyle
}

const CurrencyItem: React.FC<CurrencyItemProps> = ({
	currency,
	separatorStyle
}) => {
	const { selectedCurrency, setSelectedCurrency } = useCurrencies().context

	const { staticColors } = useColors()

	const styles = StyleSheet.create({
		button: {
			width: '100%',
			height: 55,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center'
		},
		btnContent: {
			width: '95%',
			flexDirection: 'row',
			alignItems: 'center',
			gap: 20
		},
		textContent: {
			flexDirection: 'row',
			width: '90%',
			height: '100%',
			paddingVertical: 20,
			justifyContent: 'space-between',
			alignItems: 'center',
			...separatorStyle
		}
	})

	return (
		<TouchableOpacity
			style={styles.button}
			onPress={() => setSelectedCurrency(currency)}>
			<View style={styles.btnContent}>
				<IconCircle
					emoji={currency.symbol}
					size={35}
					backgroundColor={staticColors.tintColor}
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						color: 'rgb(255, 255, 255)'
					}}
				/>
				<View style={styles.textContent}>
					<Text>{currency.name}</Text>
				</View>
			</View>
			{selectedCurrency.name === currency.name && (
				<IconSymbol
					name='checkmark'
					size={20}
				/>
			)}
		</TouchableOpacity>
	)
}

export default CurrencyItem
