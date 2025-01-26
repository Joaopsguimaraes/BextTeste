import type { PiniaPluginContext } from 'pinia'

function LocalStoragePlugin({ store }: PiniaPluginContext) {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    store.$patch({ user: JSON.parse(storedUser) })
  }

  store.$subscribe((mutation, state) => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user))
    } else {
      localStorage.removeItem('user')
    }
  })
}

export default LocalStoragePlugin
