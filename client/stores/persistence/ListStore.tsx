import * as UIReact from 'tinybase/ui-react/with-schemas'
import { useCreateClientPersisterAndStart } from './useCreateClientPersisterAndStart'
import { createMergeableStore } from 'tinybase/with-schemas'
import { useCreateServerSynchronizerAndStart } from '../synchronization/useServerSynchronizerAndStart'
import { userUserIdAndNickname } from '@/hooks/useNickname'

const STORE_ID_PREFIX = 'listStore-'

const VALUES_SCHEMA = {
	listId: { type: 'string' },
	name: { type: 'string' },
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
		quatity: { type: 'number' },
		units: { type: 'string' },
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
type ListProductsCell = keyof (typeof TABLES_SCHEMA)['products']

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

	const [userId, nickname] = userUserIdAndNickname()

	useCreateClientPersisterAndStart(storeId, store, initialContentJson, () =>
		store.setRow('collaborators', userId as string, { nickname })
	)

	useCreateServerSynchronizerAndStart(storeId, store)
	useProvideStore(storeId, store)

	return null
}
