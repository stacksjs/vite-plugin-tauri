import type { Window } from '@tauri-apps/api/window'
import { Menu, PredefinedMenuItem } from '@tauri-apps/api/menu'

export async function createMenu(appWindow: Window): Promise<Menu> {
  // Create menu items with individual handlers
  const showItem = {
    id: 'show',
    text: 'Show Window',
    enabled: true,
    action: async () => {
      // eslint-disable-next-line no-console
      console.log('Show window clicked')
      await appWindow.show()
      await appWindow.setFocus()
    },
  }

  const hideItem = {
    id: 'hide',
    text: 'Hide Window',
    enabled: true,
    action: async () => {
      // eslint-disable-next-line no-console
      console.log('Hide window clicked')
      await appWindow.hide()
    },
  }

  // Create a separator
  const separator = await PredefinedMenuItem.new({ item: 'Separator' })

  const quitItem = {
    id: 'quit',
    text: 'Quit',
    enabled: true,
    action: () => {
      // eslint-disable-next-line no-console
      console.log('Quit clicked')
      appWindow.close()
    },
  }

  // Create the menu with items
  return await Menu.new({
    items: [showItem, hideItem, separator, quitItem],
  })
}
