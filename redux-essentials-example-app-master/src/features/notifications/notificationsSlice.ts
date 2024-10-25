import { client } from '@/api/client'
import { AppThunk, RootState } from '@/store'
import { createAppAsyncThunk } from '@/withTypes'
import { createAction, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'
import { forceGenerateNotifications } from '@/api/server'

const notificationsReceived = createAction<ServerNotification[]>('notifications/notificationsReceived')

export interface ServerNotification {
  id: string
  date: string
  message: string
  user: string
}

export interface NotificationMetadata {
  // Add an `id` field, since this is now a standalone object
  id: string
  read: boolean
  isNew: boolean
}

const metadataAdapter = createEntityAdapter<NotificationMetadata>()

const initialState = metadataAdapter.getInitialState()

export const apiSliceWithNotifications = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<ServerNotification[], void>({
      query: () => '/notifications',
      async onCacheEntryAdded(arg, lifecylceApi) {
        const ws = new WebSocket('ws://localhost')

        try {
          await lifecylceApi.cacheDataLoaded

          const listener = (event: MessageEvent<string>) => {
            const message: { type: 'notifications'; payload: ServerNotification[] } = JSON.parse(event.data)
            switch (message.type) {
              case 'notifications': {
                lifecylceApi.updateCachedData((draft) => {
                  draft.push(...message.payload)
                  draft.sort()
                })

                lifecylceApi.dispatch(notificationsReceived(message.payload))

                break
              }
              default:
                break
            }
          }

          ws.addEventListener('message', listener)
        } catch {}

        await lifecylceApi.cacheEntryRemoved
        ws.close()
      },
    }),
  }),
})

export const fetchNotificationsWebsocket = (): AppThunk => (dispatch, getState) => {
  const allNotifications = selectNotificationsData(getState())
  const [latestNotification] = allNotifications
  const latestTimestamp = latestNotification?.date ?? ''
  forceGenerateNotifications(latestTimestamp)
}

const emptyNotifications: ServerNotification[] = []

export const selectNotificationsResult = apiSliceWithNotifications.endpoints.getNotifications.select()

const selectNotificationsData = createSelector(
  selectNotificationsResult,
  (notificationsResult) => notificationsResult.data ?? emptyNotifications,
)

export const fetchNotifications = createAppAsyncThunk('notifications/fetchNotifications', async (_unused, thunkApi) => {
  const response = await client.get<ServerNotification[]>(`/fakeApi/notifications`)
  return response.data
})

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    allNotificationsRead(state) {
      Object.values(state.entities).forEach((metadata) => (metadata.read = true))
    },
  },
  extraReducers(builder) {
    builder.addMatcher(apiSliceWithNotifications.endpoints.getNotifications.matchFulfilled, (state, action) => {})
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      const notificationsMetadata: NotificationMetadata[] = action.payload.map((notification) => ({
        // Give the metadata object the same ID as the notification
        id: notification.id,
        read: false,
        isNew: true,
      }))

      // Rename to `metadata`
      Object.values(state.entities).forEach((metadata) => {
        // Any notifications we've read are no longer new
        metadata.isNew = !metadata.read
      })

      metadataAdapter.upsertMany(state, notificationsMetadata)
    })
  },
})

export const { useGetNotificationsQuery } = apiSliceWithNotifications

export default notificationsSlice.reducer

export const { allNotificationsRead } = notificationsSlice.actions

export const { selectAll: selectAllNotificationsMetadata, selectEntities: selectMetadataEntities } =
  metadataAdapter.getSelectors((state: RootState) => state.notifications)

export const selectUnreadNotificationsCount = (state: RootState) => {
  const allNotifications = selectAllNotificationsMetadata(state)
  const unreadNotifications = allNotifications.filter((notification) => !notification.read)

  return unreadNotifications.length
}
