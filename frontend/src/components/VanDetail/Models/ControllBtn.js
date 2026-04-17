import React from 'react'
import { PrimaryButton } from '@/components/Common/Common'

export default function ControlBtn({ label, active, onClick }) {
  return (
    <PrimaryButton
      label={`${label} ${active ? '(Close)' : '(Open)'}`}
      onClick={onClick}
      className={`w-full text-xs md:text-sm ${active ? 'bg-[#ED3500] border-transparent' : 'bg-transparent border-slate-700 hover:border-slate-500'}`}
    />
  )
}