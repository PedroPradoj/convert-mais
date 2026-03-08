'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface ToastContextType {
  toast: (message: string) => void
}

const ToastContext = createContext<ToastContextType>({ toast: () => {} })

export function useToast() {
  return useContext(ToastContext)
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)

  const toast = useCallback((msg: string) => {
    setMessage(msg)
    setVisible(true)
    setTimeout(() => setVisible(false), 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {visible && (
        <div className="fixed bottom-[22px] right-[22px] z-[200] animate-in slide-in-from-bottom-2 duration-200">
          <div className="bg-slate-900 text-white py-[11px] px-[17px] rounded-[11px] text-[13px] font-medium flex items-center gap-[9px] shadow-2xl">
            <div className="w-[7px] h-[7px] rounded-full bg-emerald-400" />
            {message}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  )
}
