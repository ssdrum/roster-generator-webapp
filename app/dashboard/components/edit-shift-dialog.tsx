import React, { FC } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Pencil2Icon } from '@radix-ui/react-icons';
import './edit-shift-dialog.css';
import { Shift } from '@prisma/client';
import { Button } from '@/app/ui/shadcn/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/app/ui/shadcn/ui/select';

type Props = {
  selected?: string,
  shifts: Shift[];
};

const EditShiftBtn: FC<Props> = ({ selected, shifts }) => {
  const shiftOptions = [
    <SelectItem key='off' value='off'>
      Off
    </SelectItem>,
    ...shifts.map((shift) => (
      <SelectItem key={shift.id} value={shift.id}>
        {shift.name}
      </SelectItem>
    )),
  ];

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className='cursor-pointer'>
          <Pencil2Icon />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='DialogOverlay' />
        <Dialog.Content className='DialogContent'>
          <Dialog.Title className='DialogTitle'>Edit shift</Dialog.Title>
          <Dialog.Description className='DialogDescription'>
            Select the new shift. Click Save changes when you&apos;re done.
          </Dialog.Description>
          <fieldset className='Fieldset'>
            <label className='Label' htmlFor='shiftSelect'>
              Select Shift
            </label>
            <Select defaultValue={selected}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select a shift' />
              </SelectTrigger>
              <SelectContent>{shiftOptions}</SelectContent>
            </Select>
          </fieldset>
          <div
            style={{
              display: 'flex',
              marginTop: 25,
              justifyContent: 'flex-end',
            }}
          >
            <Dialog.Close asChild>
              <Button
                className='bg-green-200 text-green-800 hover:bg-green-300'
                type='button'
              >
                Save changes
              </Button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className='IconButton' aria-label='Close'>
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditShiftBtn;
