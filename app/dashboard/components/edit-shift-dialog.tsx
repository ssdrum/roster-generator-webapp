import React, { FC, useState } from 'react';
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
import { RosterAssignment } from '@/app/lib/formSchemas';
import { useRouter } from 'next/navigation';

type Props = {
  selected?: string;
  shifts: Shift[];
  assignment: RosterAssignment;
  day: number;
};

const EditShiftBtn: FC<Props> = ({ selected, shifts, assignment, day }) => {
  const [selectedShift, setSelectedShift] = useState(selected);
  const router = useRouter();

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

  // Store selected shift in state
  const handleShiftChange = (value: string) => {
    setSelectedShift(value);
  };

  // Update shift in database
  const handleClick = () => {
    console.log(selectedShift)

    try {
      fetch('/api/prisma/roster', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shift: selectedShift === 'off' ? null : selectedShift,
          day: day,
          assignment: assignment,
        }),
      });
    } catch {
      console.log('Error trying to change shift');
    } finally {
      router.refresh();
    }
  };

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
            <Select defaultValue={selected} onValueChange={handleShiftChange}>
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
                type='submit'
                onClick={handleClick}
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
