import ReconnectingWebSocket from 'reconnecting-websocket'
import { createWsSynchronizer } from 'tinybase/synchronizers/synchronizer-ws-client/with-schemas'
import * as UiReact from 'tinybase/ui-react/with-schemas'
import { MergeableStore, OptionalSchemas } from 'tinybase/with-schemas'

const SYNC_SERVER_URL = process.env.EXPO_PUBLIC_SYNC_SERVER_URL

console.log('▶️ [Sync] Sync server URL:', SYNC_SERVER_URL)

if (!SYNC_SERVER_URL) {
	throw new Error(
		'Please set EXPO_PUBLIC_SYNC_SERVER_URL in .env to the URL of the sync server'
	)
}

export const useCreateServerSynchronizerAndStart = <
	Schemas extends OptionalSchemas
>(
	storeId: string,
	store: MergeableStore<Schemas>
) =>
	(UiReact as UiReact.WithSchemas<Schemas>).useCreateSynchronizer(
		store,
		async (store: MergeableStore<Schemas>) => {
			// Build full WebSocket URL
			const url = SYNC_SERVER_URL + storeId
			console.log('▶️ [Sync] Connecting WebSocket to', url)

			// Create and instrument WebSocket
			const ws = new ReconnectingWebSocket(url, [], {
				maxReconnectionDelay: 1000,
				connectionTimeout: 1000
			})

			// Initialize synchronizer
			const synchronizer = await createWsSynchronizer(store, ws)

			// Log key events
			ws.addEventListener('open', () => {
				console.log('🟢 [Sync] WebSocket OPEN')
				synchronizer.load().then(() => {
					console.log('🔄 [Sync] Loaded after WS open')
					synchronizer.save().then(() => {
						console.log('✅ [Sync] Saved after load')
					})
				})
			})
			ws.addEventListener('message', (e) =>
				console.log('📨 [Sync] WS MSG', e.data)
			)
			ws.addEventListener('error', (err) =>
				console.error('🔴 [Sync] WS ERR', err)
			)

			// Start the periodic sync
			await synchronizer.startSync()
			console.log('🔄 [Sync] Synchronizer started')
			return synchronizer
		},
		[storeId]
	)
