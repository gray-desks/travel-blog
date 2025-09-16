"use client"

import { useState } from 'react'
import Image from 'next/image'

const joinClassName = (...values) => values.filter(Boolean).join(' ')

export default function ImageWithSpinner({
  className = '',
  wrapperClassName = '',
  spinnerClassName = '',
  spinnerLabel = '画像を読み込み中',
  onLoadingComplete,
  onError,
  ...props
}) {
  const [loading, setLoading] = useState(true)
  const isFill = Boolean(props.fill)
  const wrapperClasses = joinClassName(
    'img-spinner-wrapper',
    isFill ? 'img-spinner-wrapper--fill' : 'img-spinner-wrapper--intrinsic',
    loading ? 'is-loading' : 'is-loaded',
    wrapperClassName
  )
  const imageClasses = joinClassName(className, loading && 'is-loading')

  return (
    <span className={wrapperClasses}>
      {loading && (
        <span className={joinClassName('img-spinner', spinnerClassName)} role="status" aria-live="polite" aria-label={spinnerLabel}>
          <span className="sr-only">{spinnerLabel}</span>
        </span>
      )}
      <Image
        {...props}
        className={imageClasses || undefined}
        onLoadingComplete={(result) => {
          setLoading(false)
          if (typeof onLoadingComplete === 'function') onLoadingComplete(result)
        }}
        onError={(event) => {
          setLoading(false)
          if (typeof onError === 'function') onError(event)
        }}
      />
    </span>
  )
}
