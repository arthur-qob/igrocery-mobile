import { useListValue } from '@/stores/persistence/ListStore'

const useListContent = (listId: string) => {
	const [title] = useListValue(listId, 'title')
	const [emoji] = useListValue(listId, 'emoji')
	const [color] = useListValue(listId, 'color')
	const [description] = useListValue(listId, 'description')
	const [createdAt] = useListValue(listId, 'createdAt')
	const [updatedAt] = useListValue(listId, 'updatedAt')

	return {
		title,
		emoji,
		color,
		description,
		createdAt,
		updatedAt
	}
}

export default useListContent
