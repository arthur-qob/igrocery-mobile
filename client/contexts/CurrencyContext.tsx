import { createContext, useContext, useState } from 'react'

const currencies = {
	BRL: { name: 'Brazilian Real', symbol: 'R$' },
	USD: { name: 'United States Dollar', symbol: '$' },
	ARS: { name: 'Argentine Peso', symbol: '$' },
	CLP: { name: 'Chilean Peso', symbol: '$' },
	COP: { name: 'Colombian Peso', symbol: '$' },
	MXN: { name: 'Mexican Peso', symbol: '$' },
	PEN: { name: 'Peruvian Sol', symbol: 'S/' },
	VEF: { name: 'Venezuelan Bolívar', symbol: 'Bs' },
	BOB: { name: 'Bolivian Boliviano', symbol: 'Bs.' },
	CVE: { name: 'Cape Verdean Escudo', symbol: '$' },
	CRC: { name: 'Costa Rican Colón', symbol: '₡' },
	DOP: { name: 'Dominican Peso', symbol: 'RD$' },
	EUR: { name: 'Euro', symbol: '€' },
	JPY: { name: 'Japanese Yen', symbol: '¥' },
	GBP: { name: 'British Pound Sterling', symbol: '£' },
	AUD: { name: 'Australian Dollar', symbol: 'A$' },
	CAD: { name: 'Canadian Dollar', symbol: 'C$' },
	CHF: { name: 'Swiss Franc', symbol: 'CHF' },
	CNY: { name: 'Chinese Yuan', symbol: '¥' },
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
