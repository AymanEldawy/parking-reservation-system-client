import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import {DialogHeader } from '../ui/dialog';

const ErrorModal = ({ title, description }: { title?: string, description?: string, onClose?: () => void }) => {

  return (
    <Dialog open={true} key="error">
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ErrorModal