import { Alert, AlertDescription, AlertTitle } from '../ui/alert'

type ErrorMessageProps = {
  title?: string;
  description?: string;
}

const ErrorMessage = ({ title, description }: ErrorMessageProps) => {
  return (
    <Alert className='border-0 p-0 mt-4 px-4'>
      <AlertTitle className="text-red-500 text-center bg-red-100 rounded-md px-2 py-1 capitalize text-sm">{title}</AlertTitle>
      <AlertDescription>
        {description}
      </AlertDescription>
    </Alert>
  )
}

export default ErrorMessage