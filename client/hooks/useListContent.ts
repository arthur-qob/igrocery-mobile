import { useListValue } from '@/stores/persistence/ListStore'
import React from 'react'

type ListField =
	| 'title'
	| 'emoji'
	| 'color'
	| 'description'
	| 'totalAmount'
	| 'createdAt'
	| 'updatedAt'

export const useListContent = ({
	listId,
	requiredFields
}: {
	listId: string
	requiredFields?: ListField | ListField[]
}) => {
	const [title] = useListValue(listId, 'title')
	const [emoji] = useListValue(listId, 'emoji')
	const [color] = useListValue(listId, 'color')
	const [description] = useListValue(listId, 'description')
	const [totalAmount] = useListValue(listId, 'totalAmount')
	const [createdAt] = useListValue(listId, 'createdAt')
	const [updatedAt] = useListValue(listId, 'updatedAt')

	const allFields: Record<ListField, any> = {
		title,
		emoji,
		color,
		description,
		totalAmount,
		createdAt,
		updatedAt
	}

	if (!requiredFields) {
		return allFields
	}

	if (typeof requiredFields === 'string') {
		return { [requiredFields]: allFields[requiredFields] }
	} else {
		const selectedFields: Partial<typeof allFields> = {}
		for (const field of requiredFields) {
			console.log(`Field: ${field}`)
			console.log(`Stored values: ${allFields[field]}`)
			selectedFields[field as ListField] = allFields[field as ListField]
		}

		return selectedFields
	}
}
