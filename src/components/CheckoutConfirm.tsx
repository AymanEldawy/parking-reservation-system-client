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
        <div className="flex flex-col gap-4 px-8 pb-8">
          <button
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-6 bg-gray-900 text-white text-base font-semibold leading-normal tracking-wide shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50 transition-colors">
            <span className="truncate">Done</span>
          </button>
          <button
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-6 bg-gray-100 text-gray-800 text-base font-semibold leading-normal tracking-wide border border-gray-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 transition-colors">
            <span className="truncate">New Transaction</span>
          </button>
        </div>
      </div>
    </div>

  )
}

export default CheckoutConfirm