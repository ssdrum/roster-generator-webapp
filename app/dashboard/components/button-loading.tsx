import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '@/app/ui/shadcn/button';

const ButtonLoading = () => {
  return (
    <Button disabled={true}>
      <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
      Generating...
    </Button>
  );
};

export default ButtonLoading;
