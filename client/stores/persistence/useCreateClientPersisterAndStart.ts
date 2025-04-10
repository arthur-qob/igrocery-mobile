import * as UiReact from 'tinybase/ui-react/with-schemas'
import {
	Content,
	MergeableStore,
	OptionalSchemas,
	Store
} from 'tinybase/with-schemas'
import { createClientPersister } from './createClientPersister'

export const useCreateClientPersisterAndStart = <
	Schemas extends OptionalSchemas
>(
	storeId: string,
	store: MergeableStore<Schemas>,
	initialValues?: string,
	then?: () => void
) =>
	(UiReact as UiReact.WithSchemas<Schemas>).useCreatePersister(
		store,
		(store: MergeableStore<Schemas> | Store<Schemas>) =>
			createClientPersister(storeId, store as MergeableStore<Schemas>),
		[storeId],
		async (persister) => {
			let initialContent: Content<Schemas> | undefined = undefined
			try {
				initialContent = [{}, JSON.parse(initialValues as string)]
			} catch {}

			await persister.load(initialContent)
			await persister.startAutoSave()
			then?.()
		},
		[initialValues]
	)
