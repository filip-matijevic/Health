import React from 'react'

type Props = { onReload: () => void; onDismiss?: () => void }

export default function UpdateBanner({ onReload, onDismiss }: Props) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 rounded-xl bg-black text-white px-4 py-3 shadow-lg flex items-center gap-3">
      <span>New version available.</span>
      <button onClick={onReload} className="bg-white text-black rounded-lg px-3 py-1">
        Update
      </button>
      <button onClick={onDismiss} className="opacity-80 underline">
        Later
      </button>
    </div>
  )
}