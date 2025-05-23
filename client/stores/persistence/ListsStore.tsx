import { useUser } from '@clerk/clerk-expo'
import * as UIReact from 'tinybase/ui-react/with-schemas'
import { createMergeableStore, NoValuesSchema } from 'tinybase/with-schemas'
import { useCreateClientPersisterAndStart } from './useCreateClientPersisterAndStart'
import { useCreateServerSynchronizerAndStart } from '../synchronization/useServerSynchronizerAndStart'
import ListStore from './ListStore'
import { useCallback } from 'react'
import { randomUUID } from 'expo-crypto'
import { Platform } from 'react-native'

const STORE_ID_PREFIX = 'listsStore-'

const TABLES_SCHEMA = {
	lists: {
		id: { type: 'string' },
		valuesCopy: { type: 'string' }
	}
} as const

const {
	useCreateMergeableStore,
	useDelRowCallback,
	useProvideStore,
	useRowIds,
	useStore,
	useTable
} = UIReact as UIReact.WithSchemas<[typeof TABLES_SCHEMA, NoValuesSchema]>

const useStoreId = () => {
	const storeId = STORE_ID_PREFIX + useUser()?.user?.id
	console.log(`Store ID (${Platform.OS}): ${storeId}`)
	return storeId
}

export const useAddListCallback = () => {
	const store = useStore(useStoreId())
	return useCallback(
		(title: string, description: string, emoji: string, color: string) => {
			const id = randomUUID()
			store?.setRow('lists', id, {
				id,
				valuesCopy: JSON.stringify({
					id,
					title,
					description,
					totalAmount: 0,
					emoji,
					color,
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString()
				})
			})
			return id
		},
		[store]
	)
}

export const useListsIds = () => useRowIds('lists', useStoreId())

export const useDelListCallback = (id: string) =>
	useDelRowCallback('lists', id, useStoreId())

export default function ListsStore() {
	const storeId = useStoreId()

	const store = useCreateMergeableStore(() =>
		createMergeableStore().setTablesSchema(TABLES_SCHEMA)
	)

	useCreateClientPersisterAndStart(storeId, store)
	useCreateServerSynchronizerAndStart(storeId, store)
	useProvideStore(storeId, store)

	const currentUserLists = useTable('lists', storeId)

	return Object.entries(useTable('lists', storeId)).map(
		([listId, { valuesCopy }]) => (
			<ListStore
				listId={listId}
				key={listId}
				initialContentJson={valuesCopy as string}
			/>
		)
	)
}
