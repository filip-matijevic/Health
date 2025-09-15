// sw-updater.ts
import { Workbox } from 'workbox-window'

export type ApplyUpdate = () => void
export type OnUpdate = (opts: { apply: ApplyUpdate }) => void

export function setupServiceWorker(onUpdate: OnUpdate): void {
  if (!('serviceWorker' in navigator)) return

  const swUrl = `${import.meta.env.BASE_URL}sw.js`
  const scope = import.meta.env.BASE_URL || '/'

  const wb = new Workbox(swUrl, { scope })

  const handleWaiting = () => {
    onUpdate({
      apply: async () => {
        const reload = () => window.location.reload()
        wb.addEventListener('controlling', reload)
        try {
          await wb.messageSkipWaiting()
        } catch {
          window.location.reload()
        }
      },
    })
  }

  wb.addEventListener('waiting', handleWaiting)
  wb.register().catch(() => {})
}