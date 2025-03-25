import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'
import { useColorScheme } from 'react-native'

type colorTheme = 'light' | 'dark'
type Theme = 'light' | 'dark' | 'system'

interface ThemeContextProps {
	currentTheme: colorTheme
	setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps>({
	currentTheme: 'light',
	setTheme: () => {},
})

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [theme, setTheme] = useState<Theme>('system')

	const systemTheme = (useColorScheme() ?? 'light') as colorTheme

	const currentTheme: colorTheme = theme === 'system' ? systemTheme : theme

	return (
		<ThemeContext.Provider value={{ currentTheme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useTheme = () => {
	const context = useContext(ThemeContext)

	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}

	return context
}
