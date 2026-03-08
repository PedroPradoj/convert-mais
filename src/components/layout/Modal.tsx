'use client'

import { useEffect, useRef } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, title, subtitle, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-[#0c2340]/50 z-[100] flex items-center justify-center backdrop-blur-[3px]"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
    >
      <div className="bg-white rounded-[18px] p-7 max-w-[500px] w-[92%] shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
        <div className="flex justify-between items-center mb-[18px]">
          <div>
            <h3 className="text-[17px] font-extrabold text-slate-900">{title}</h3>
            {subtitle && (
              <p className="text-[12px] text-slate-400 mt-[2px]">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="bg-slate-100 border-none cursor-pointer p-[7px] rounded-[7px] text-slate-500 hover:bg-slate-200 transition-colors"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
