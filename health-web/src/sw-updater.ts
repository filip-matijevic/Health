import { Workbox } from 'workbox-window'

export type OnUpdateCallback = (opts: { apply: () => void }) => void

export function setupServiceWorker(onUpdate: OnUpdateCallback) {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js', { scope: '/' })

    // When a new SW is waiting, prompt the user
    wb.addEventListener('waiting', () => {
      onUpdate({
        apply: async () => {
          // Tell the waiting SW to activate now
          await wb.messageSkipWaiting()
          // Reload to get the new content
          window.location.reload()
        }
      })
    })

    // Optional: updatefound can be used to show "Updating..." UI
    // wb.addEventListener('installed', (e) => { if (!e.isUpdate) ... })

    wb.register()
  }
}