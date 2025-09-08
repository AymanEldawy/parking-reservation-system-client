import type { SubscriptionType } from '@/types/subscription.type'
import CarCard from './CarCard'
import ErrorMessage from './shared/ErrorMessage'

const SubscriptionInfo = ({ subscription }: { subscription: SubscriptionType }) => {
  return (
    <div
      className="mt-8 space-y-2 rounded-lg border border-dashed border-gray-300 bg-white p-4 text-center shadow-sm">
      <div className='flex-container'>
        <h2>Username: <span className='font-semibold text-[var(--text-primary)]'>{subscription.userName}</span></h2>
        <span
          className={`capitalize inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${subscription.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
        >
          {subscription.active ? 'active' : 'non active'}
        </span>
      </div>
      <div className='flex-container flex-wrap gap-4 capitalize text-sm'>
        <p className="text-[var(--text-secondary)]">
          category: <span className="font-semibold text-[var(--text-primary)]">{subscription.category}</span>
        </p>
        <p className="text-[var(--text-secondary)]">
          startsAt: <span className="font-semibold text-[var(--text-primary)]">{new Date(subscription.startsAt).toLocaleString()}</span>
        </p>
        <p className="text-[var(--text-secondary)]">
          expiresAt: <span className="font-semibold text-[var(--text-primary)]">{new Date(subscription.expiresAt).toLocaleString()}</span>
        </p>
      </div>
      <div className='w-full'>
        <h3 className='text-start font-bold text-base mt-4 '>Cars: </h3>
        {subscription.cars && subscription.cars.length ?
          <>
            {subscription.cars.map((car, index) => (
              <CarCard key={index} car={car} index={index + 1} />
            ))}
          </>
          :
          <ErrorMessage title='There is no cars for this subscription' />
        }
      </div>
    </div>
  )
}

export default SubscriptionInfo