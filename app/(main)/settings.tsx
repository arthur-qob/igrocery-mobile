import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { View } from 'react-native'

export default function SettingsScreen() {
	return (
		<Div>
			<View>
				<Button
					variant='danger'
					title='Sign Out'
					// onPress={}
				/>
			</View>
		</Div>
	)
}
