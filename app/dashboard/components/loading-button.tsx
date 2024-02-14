import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from '@/app/ui/shadcn/button';
import { FC } from "react";

type Props = {
  handleClick: () => void;
}

const  ButtonLoading: FC<Props> = ({handleClick}) => {
  return (
    <Button onClick={handleClick}>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Generating...
    </Button>
  )
}

export default ButtonLoading
