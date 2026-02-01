/**
 * Payment Component - Disabled
 * Khalti & eSewa integration has been removed from the project.
 */

'use client'

import React from 'react'

export default function Payment() {
  return (
    <div className="min-h-screen flex items-center justify-center p-12">
      <div className="max-w-xl w-full bg-white shadow rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Payments Disabled</h1>
        <p className="text-gray-600 mb-4">The Khalti and eSewa payment providers have been removed from this application.</p>
        <p className="text-gray-500">If you need payment features, please open an issue or add the desired provider integration.</p>
      </div>
    </div>
  )
}
