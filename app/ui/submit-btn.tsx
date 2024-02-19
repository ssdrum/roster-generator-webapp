import { FC, FormEvent } from 'react';
import { Button } from '@/app/ui/shadcn/button';
import { Loader2 } from 'lucide-react';

type Props = {
  isSubmitting: boolean;
  text: string;
  submittingText: string;
  handleClick?: (e: FormEvent) => Promise<void>; // Optional
};

// Shows a spinner icon and disables itself if isSubmitting is true. Shows a regular button otherwise
const SubmitBtn: FC<Props> = ({
  isSubmitting,
  text,
  submittingText,
  handleClick,
}) => {
  return (
    <div className='col-span-11 pr-4 pt-4'>
      {isSubmitting ? (
        <Button disabled className='w-full'>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          {submittingText}
        </Button>
      ) : (
        <Button className='w-full' type='submit' onClick={handleClick}>
          {text}
        </Button>
      )}
    </div>
  );
};

export default SubmitBtn;
