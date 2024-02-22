import { FC } from 'react';
import { RosterAssignment } from '@/app/lib/formSchemas';
import { Button } from '@/app/ui/shadcn/button';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/ui/shadcn/ui/select';
import { Shift } from '@prisma/client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  shifts: Shift[];
  assignment: RosterAssignment;
  day: number;
};

// This component allows the user to manually adding an assignment in the roster
const AddShift: FC<Props> = ({ shifts, assignment, day }) => {
  const [show, setShow] = useState(false);
  const [selectedShift, setSelectedShift] = useState('off');
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

  // Update assignment in database
  const handleClick = () => {
    // Only update if user selects a shift
    if (selectedShift !== 'off') {
      try {
        fetch('/api/prisma/roster', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            shift: selectedShift,
            day: day,
            assignment: assignment,
          }),
        });
      } catch {
        console.log('Error trying to change shift');
      } finally {
        router.refresh();
      }
    }
  };

  return (
    <div
      className='flex h-full flex-col justify-center'
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className='flex h-[100px] items-center justify-center'>
        {show && (
          <Dialog.Root
            onOpenChange={(isOpen) => !isOpen && setShow(false)} // Do not show icon if dialog is closed
          >
            <Dialog.Trigger className='h-max w-max'>
              <FontAwesomeIcon
                icon={faPlus}
                size='lg'
                color='green'
                className='p-auto'
              />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className='DialogOverlay' />
              <Dialog.Content className='DialogContent'>
                <Dialog.Title className='DialogTitle'>Edit shift</Dialog.Title>
                <Dialog.Description className='DialogDescription'>
                  Select the new shift. Click Save changes when you&apos;re
                  done.
                </Dialog.Description>
                <fieldset className='Fieldset'>
                  <label className='Label' htmlFor='shiftSelect'>
                    Select Shift
                  </label>
                  <Select
                    defaultValue={'off'}
                    onValueChange={handleShiftChange}
                  >
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
        )}
      </div>
    </div>
  );
};

export default AddShift;
