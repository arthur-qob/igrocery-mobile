import * as UIReact from 'tinybase/ui-react/with-schemas'
import { useCreateClientPersisterAndStart } from './useCreateClientPersisterAndStart'
import { Cell, createMergeableStore, Value } from 'tinybase/with-schemas'
import { useCreateServerSynchronizerAndStart } from '../synchronization/useServerSynchronizerAndStart'
import { useUserIdAndNickname } from '@/hooks/useNickname'
import { useCallback } from 'react'
import { randomUUID } from 'expo-crypto'

const STORE_ID_PREFIX = 'listStore-'

const VALUES_SCHEMA = {
	listId: { type: 'string' },
	title: { type: 'string' },
	description: { type: 'string' },
	emoji: { type: 'string' },
	color: { type: 'string' },
	createdAt: { type: 'string' },
	updatedAt: { type: 'string' }
} as const

const TABLES_SCHEMA = {
	products: {
		id: { type: 'string' },
		name: { type: 'string' },
		quantity: { type: 'number' },
		price: { type: 'number' },
		isPurchased: { type: 'boolean' },
		category: { type: 'string' },
		notes: { type: 'string' },
		createdBy: { type: 'string' },
		createdAt: { type: 'string' },
		updatedAt: { type: 'string' }
	},
	collaborators: {
		nickname: { type: 'string' }
	}
} as const

type Schemas = [typeof TABLES_SCHEMA, typeof VALUES_SCHEMA]
type ListValuesId = keyof typeof VALUES_SCHEMA
type ListProductsCellIds = keyof (typeof TABLES_SCHEMA)['products']

const {
	useCell,
	useCreateMergeableStore,
	useProvideStore,
	useRowCount,
	useSetCellCallback,
	useSortedRowIds,
	useDelRowCallback,
	useSetValueCallback,
	useStore,
	useTable,
	useValue
} = UIReact as UIReact.WithSchemas<Schemas>

const useStoreId = (listId: string) => STORE_ID_PREFIX + listId

export const useDelShoppingListProductCallback = (
	listId: string,
	productId: string
) => useDelRowCallback('products', productId, useStoreId(listId))

export const useListProductCell = <CellId extends ListProductsCellIds>(
	listId: string,
	productId: string,
	cellId: CellId
): [
	Cell<Schemas[0], 'products', CellId>,
	(cell: Cell<Schemas[0], 'products', CellId>) => void
] => [
	useCell('products', productId, cellId, useStoreId(listId)) ??
		({} as Cell<Schemas[0], 'products', CellId>),
	useSetCellCallback(
		'products',
		productId,
		cellId,
		(cell: Cell<Schemas[0], 'products', CellId>) => cell,
		[],
		useStoreId(listId)
	)
]

export const useDelListProductCallback = (listId: string, productId: string) =>
	useDelRowCallback('products', productId, useStoreId(listId))

export const useAddListProductCallback = (listId: string) => {
	const store = useStore(useStoreId(listId))
	const [userId, nickname] = useUserIdAndNickname()

	return useCallback(
		(
			name: string | undefined,
			quantity: number | undefined,
			price: number | undefined,
			notes: string | undefined
		) => {
			const id = randomUUID()
			store?.setRow('products', id, {
				id,
				name,
				quantity,
				price,
				isPurchased: false,
				category: '',
				notes,
				createdBy: nickname,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString()
			})
			return id
		},
		[store, listId]
	)
}

// Returns a pair of 1) a property of the shopping list, 2) a callback that
// updates it, similar to the React useState pattern.
export const useListValue = <ValueId extends ListValuesId>(
	listId: string,
	valueId: ValueId
): [
	Value<Schemas[1], ValueId>,
	(value: Value<Schemas[1], ValueId>) => void
] => [
	useValue(valueId, useStoreId(listId)) ?? ('' as Value<Schemas[1], ValueId>),
	useSetValueCallback(
		valueId,
		(value: Value<Schemas[1], ValueId>) => value,
		[],
		useStoreId(listId)
	)
]

export const useListProductCount = (listId: string) =>
	useRowCount('products', useStoreId(listId))

export const useListUsersNicknames = (listId: string) =>
	Object.entries(useTable('collaborators', useStoreId(listId))).map(
		([, { nickname }]) => nickname
	)

export const useListProductIds = (
	listId: string,
	cellId: ListProductsCellIds = 'createdAt',
	descending?: boolean,
	offset?: number,
	limit?: number
) =>
	useSortedRowIds(
		'products',
		cellId,
		descending,
		offset,
		limit,
		useStoreId(listId)
	)

// Create, persiste and synchronize a store
export default function ListStore({
	listId,
	initialContentJson
}: {
	listId: string
	initialContentJson: string
}) {
	const storeId = useStoreId(listId)
	const store = useCreateMergeableStore(() =>
		createMergeableStore().setSchema(TABLES_SCHEMA, VALUES_SCHEMA)
	)

	const [userId, nickname] = useUserIdAndNickname()

	useCreateClientPersisterAndStart(storeId, store, initialContentJson, () =>
		store.setRow('collaborators', userId as string, { nickname })
	)

	useCreateServerSynchronizerAndStart(storeId, store)
	useProvideStore(storeId, store)

	return null
}
