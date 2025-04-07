import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState
} from 'react'
import { Appearance, useColorScheme } from 'react-native'

type colorTheme = 'light' | 'dark'
type Theme = 'light' | 'dark' | 'system'

interface ThemeContextProps {
	currentTheme: colorTheme
	setThemeOpt: (theme: Theme) => void
	themes: Theme[]
	themeOpt: Theme
}

export const ThemeContext = createContext<ThemeContextProps>({
	currentTheme: 'light',
	setThemeOpt: () => {},
	themes: ['light', 'dark', 'system'],
	themeOpt: 'system'
})

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
	children
}) => {
	const themes: Theme[] = ['light', 'dark', 'system']

	const [themeOpt, setThemeOpt] = useState<Theme>('system')

	const systemTheme = (useColorScheme() ?? 'light') as colorTheme

	const currentTheme = themeOpt === 'system' ? systemTheme : themeOpt

	return (
		<ThemeContext.Provider
			value={{ currentTheme, setThemeOpt, themes, themeOpt }}>
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
