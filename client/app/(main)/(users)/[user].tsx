import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { Input } from '@/components/Input'
import { Text } from '@/components/ThemedText'
import IconSymbol from '@/components/ui/IconSymbol'
import { useColors } from '@/constants/Colors'
import { useUser } from '@clerk/clerk-expo'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'

export default function UserScreen() {
	const { userId } = useLocalSearchParams()

	const { user, isLoaded } = useUser()

	const [currentUser, setCurrentUser] = useState<{ [key: string]: any }>({
		id: null,
		name: null,
		emailAddress: null,
		isEmailVerified: null,
		hasImage: null,
		imageUrl: null
	})

	useEffect(() => {
		if (!isLoaded) return

		setCurrentUser({
			id: user?.id,
			name: user?.firstName,
			emailAddress: user?.primaryEmailAddress?.emailAddress,
			isEmailVerified: user?.hasVerifiedEmailAddress,
			hasImage: user?.hasImage,
			imageUrl: currentUser.hasImage ? user?.imageUrl : ''
		})
	}, [isLoaded])

	const [pickingImg, setPickingImg] = useState<boolean>(false)

	const { themedColors, staticColors } = useColors()

	const styles = StyleSheet.create({
		mainContainer: {
			flexDirection: 'column',
			justifyContent: 'flex-start',
			alignItems: 'center',
			paddingTop: 16,
			gap: 25
		},
		ImgContainer: {
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			gap: 15
		},
		ImgBtnContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			gap: 10
		},
		separator: {
			width: '100%',
			height: 1,
			backgroundColor: themedColors.separator,
			marginVertical: 5
		},
		userDataContainer: {
			justifyContent: 'center',
			alignItems: 'center',
			textAlign: 'center'
		},
		userData: {
			fontSize: 20
		}
	})

	const handleUploadImgBtnClick = () => {
		setPickingImg(true)

		// Do stuff
	}

	const handleDeleteImgBtnClick = () => {
		// Do stuff
	}

	return (
		<Div style={styles.mainContainer}>
			<View style={styles.ImgContainer}>
				{currentUser.hasImage ? (
					<Image source={currentUser.imageUrl} />
				) : (
					<IconSymbol
						name='person.circle'
						size={150}
					/>
				)}
				<View style={styles.ImgBtnContainer}>
					<Button
						width={125}
						variant='outlined'
						title='Delete image'
						disabled={!currentUser.hasImage}
						onPress={handleDeleteImgBtnClick}
					/>
					<Button
						width={125}
						variant='filled'
						title='Upload image'
						loading={pickingImg}
						disabled={pickingImg}
						onPress={handleUploadImgBtnClick}
					/>
				</View>
			</View>
			<View style={styles.separator} />
			<View style={styles.userDataContainer}>
				<Text style={styles.userData}>{currentUser.name}</Text>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 10
					}}>
					<Text style={styles.userData}>
						{currentUser.emailAddress}
					</Text>
					<IconSymbol
						name={`${currentUser.isEmailVerified ? 'checkmark.circle' : 'xmark.circle'}`}
						size={25}
						color={
							currentUser.isEmailVerified
								? staticColors.success
								: staticColors.danger
						}
					/>
				</View>
			</View>
		</Div>
	)
}
