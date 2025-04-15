import { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const currencies = {
	BRL: { name: 'Brazilian Real', symbol: 'R$' },
	USD: { name: 'United States Dollar', symbol: '$' },
	CNY: { name: 'Chinese Yuan', symbol: '¥' },
	EUR: { name: 'Euro', symbol: '€' },
	CHF: { name: 'Swiss Franc', symbol: 'CHF' },
	JPY: { name: 'Japanese Yen', symbol: '¥' },
	AUD: { name: 'Australian Dollar', symbol: 'A$' },
	CAD: { name: 'Canadian Dollar', symbol: 'C$' },
	ARS: { name: 'Argentine Peso', symbol: 'AR$' },
	CLP: { name: 'Chilean Peso', symbol: 'CLP$' },
	COP: { name: 'Colombian Peso', symbol: 'COP$' },
	MXN: { name: 'Mexican Peso', symbol: 'MX$' },
	PEN: { name: 'Peruvian Sol', symbol: 'S/' },
	VEF: { name: 'Venezuelan Bolívar', symbol: 'Bs' },
	BOB: { name: 'Bolivian Boliviano', symbol: 'Bs' },
	CVE: { name: 'Cape Verdean Escudo', symbol: 'CVE$' },
	CRC: { name: 'Costa Rican Colón', symbol: '₡' },
	DOP: { name: 'Dominican Peso', symbol: 'RD$' },
	GBP: { name: 'British Pound Sterling', symbol: '£' },
	SEK: { name: 'Swedish Krona', symbol: 'kr' },
	NZD: { name: 'New Zealand Dollar', symbol: 'NZ$' }
}

type selectedCurrencyType = { [key: string]: string }

type CurrencyContextType = {
	selectedCurrency: selectedCurrencyType
	setSelectedCurrency: (currency: selectedCurrencyType) => void
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
	undefined
)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
	const [selectedCurrency, setSelectedCurrency] =
		useState<selectedCurrencyType>(currencies.USD)

	useEffect(() => {
		;(async () => {
			try {
				const savedCurrency =
					await AsyncStorage.getItem('selectedCurrency')
				if (savedCurrency) {
					setSelectedCurrency(JSON.parse(savedCurrency))
				}
			} catch (error) {
				console.error(
					'Failed to load currency from AsyncStorage:',
					error
				)
			}
		})()
	}, [])

	useEffect(() => {
		;(async () => {
			try {
				await AsyncStorage.setItem(
					'selectedCurrency',
					JSON.stringify(selectedCurrency)
				)
			} catch (error) {
				console.error('Failed to save currency to AsyncStorage:', error)
			}
		})()
	}, [selectedCurrency])

	return (
		<CurrencyContext.Provider
			value={{ selectedCurrency, setSelectedCurrency }}>
			{children}
		</CurrencyContext.Provider>
	)
}

export function useCurrencies() {
	const context = useContext(CurrencyContext)

	if (context === undefined)
		throw new Error('Please wrap your component with the component')

	return { currencies, context }
}
