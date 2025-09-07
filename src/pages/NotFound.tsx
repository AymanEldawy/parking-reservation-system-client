import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-6xl font-bold text-[var(--primary-color)] mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-2">Page Not Found</p>
      <p className="text-gray-500 mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary px-6 py-2 rounded-md !text-white">Go Home</Link>
    </div>
  )
}

export default NotFound