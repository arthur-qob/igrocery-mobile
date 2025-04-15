import CurrencyItem from '@/components/CurrencyItem'
import { Text } from '@/components/ThemedText'
import { useColors } from '@/constants/Colors'
import { useCurrencies } from '@/contexts/CurrencyContext'
import { FlatList, TouchableOpacity, View } from 'react-native'

export default function CurrenciesScreen() {
	const { currencies } = useCurrencies()

	const { themedColors } = useColors()

	return (
		<View
			style={{
				flex: 1,
				paddingTop: 175,
				paddingHorizontal: 10,
				paddingBottom: 50
			}}>
			<FlatList
				data={Object.values(currencies)}
				renderItem={({ item, index }) => (
					<CurrencyItem
						currency={item}
						separatorStyle={
							index > 0 && index < Object.keys(currencies).length
								? {
										borderTopWidth: 0.5,
										borderTopColor: themedColors.border
										// borderBottomWidth: 0.25,
										// borderBottomColor: themedColors.border
									}
								: {}
						}
					/>
				)}
				contentContainerStyle={{
					backgroundColor: themedColors.panel,
					paddingVertical: 10,
					paddingHorizontal: 20,
					borderRadius: 10
				}}
			/>
		</View>
	)
}
