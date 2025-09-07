import type { CarType } from '@/types/subscription.type'
import React from 'react'

const CarCard = ({ car, index }: { car: CarType, index: number }) => {
  return (
    <div className='text-start max-sm:grid max-sm:grid-cols-2 sm:flex sm:justify-between gap-2 shadow hover:bg-gray-100 p-3 rounded-md capitalize relative hover:translate-x-1 duration-150'>
      <div className='flex gap-4 items-center'>
        <span className='max-sm:hidden rounded-full flex justify-center items-center text-xs w-5 h-5 text-white p-1 bg-[var(--primary-color)]'>{index}</span>
        <p className="text-[var(--text-secondary)]">
          brand: <span className="font-semibold text-[var(--text-primary)]">{car.brand}</span>
        </p>
      </div>
      <p className="text-[var(--text-secondary)]">
        color: <span className="font-semibold text-[var(--text-primary)]">{car.color}</span>
      </p>
      <p className="text-[var(--text-secondary)]">
        model: <span className="font-semibold text-[var(--text-primary)]">{car.model}</span>
      </p>
      <p className="text-[var(--text-secondary)]">
        plate: <span className="font-semibold text-[var(--text-primary)]">{car.plate}</span>
      </p>
    </div>
  )


}




export default CarCard