import React, { useEffect, useState } from 'react'
import {
	Image,
	ImageSourcePropType,
	StyleSheet,
	TouchableOpacity,
	View
} from 'react-native'
import { Text } from './ThemedText'
import IconSymbol from '@/components/ui/IconSymbol'
import { useUser } from '@clerk/clerk-expo'
import { useColors } from '@/constants/Colors'
import { useLocalSearchParams, useRouter } from 'expo-router'

const ProfileButton: React.FC = () => {
	const { user, isLoaded } = useUser()

	// const {userId} = useLocalSearchParams()

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

	const { themedColors, staticColors } = useColors()

	const styles = StyleSheet.create({
		profileBtn: {
			position: 'relative',
			flexDirection: 'row',
			backgroundColor: themedColors.panel,
			paddingVertical: 5,
			paddingHorizontal: 10,
			justifyContent: 'space-between',
			alignItems: 'center',
			borderRadius: 10
		},
		btnContent: {
			width: '90%',
			alignSelf: 'flex-start',
			flexDirection: 'column'
		},
		halves: {
			paddingVertical: 5
		},
		half1: {
			flexDirection: 'row',
			justifyContent: 'flex-start',
			alignItems: 'center',
			gap: '5%'
		},
		imgContainer: {
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			gap: 10
		},
		image: {
			aspectRatio: 1 / 1,
			width: 75,
			borderWidth: 1,
			borderColor: currentUser.hasImage
				? staticColors.tintColor
				: 'transparent',
			borderRadius: '50%',
			justifyContent: 'center',
			alignItems: 'center',
			textAlign: 'center'
		},
		userName: {
			fontSize: 25
		},
		separator: {
			width: '98%',
			height: 1,
			backgroundColor: themedColors.separator,
			marginVertical: 5
		},
		half2: {
			flexDirection: 'row',
			justifyContent: 'flex-start',
			alignItems: 'center',
			gap: 10
		},
		userEmail: {
			fontWeight: '500',
			fontSize: 18,
			color: themedColors.inactiveColor
		}
	})

	const router = useRouter()

	const openUserScreen = () => {
		if (Object.keys(currentUser).values === null) return

		const id = currentUser.id

		// router.push({
		// 	pathname: '/users/[user]',
		// 	params: { id }
		// })
	}

	return (
		<TouchableOpacity
			style={styles.profileBtn}
			onPress={openUserScreen}>
			<View style={styles.btnContent}>
				<View style={[styles.halves, styles.half1]}>
					<View style={styles.imgContainer}>
						<View style={styles.image}>
							{currentUser.hasImage ? (
								<Image
									source={
										user?.imageUrl as ImageSourcePropType
									}
								/>
							) : (
								<IconSymbol
									name='person.circle.fill'
									size={80}
									color={themedColors.text}
								/>
							)}
						</View>
					</View>
					<Text style={styles.userName}>{user?.firstName}</Text>
				</View>
				<View style={styles.separator} />
				<View style={[styles.halves, styles.half2]}>
					<Text style={styles.userEmail}>
						Email: {currentUser.emailAddress}
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
			<IconSymbol
				name='chevron.right'
				color={themedColors.separator}
			/>
		</TouchableOpacity>
	)
}

export default ProfileButton
