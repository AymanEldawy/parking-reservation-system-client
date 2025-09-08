import { Link } from "react-router-dom"

const CheckoutConfirm = () => {
  return (
    <div className="px-4 flex flex-1 justify-center items-center py-5">
      <div
        className="layout-content-container flex flex-col w-full max-w-md py-5 bg-white shadow-sm rounded-xl border border-gray-200">
        <div className="flex flex-col items-center justify-center p-8 space-y-6">
          <div className="flex items-center justify-center bg-green-100 rounded-full h-20 w-20">
            <span className="material-symbols-outlined text-5xl text-green-600">
              check
            </span>
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-gray-800 text-3xl font-bold leading-tight">Checkout Successful</h2>
            <p className="text-gray-600 text-lg leading-normal">Your transaction is complete. The WS zone
              occupancy has been updated.</p>
          </div>
        </div>
        <div className="mt-4">
          <Link to="/" className="text-center btn-blue">Back to home</Link>
        </div>
      </div>
    </div>

  )
}

export default CheckoutConfirm