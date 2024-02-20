"use client"

import React, { FC } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
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
import { 
  Form, 
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/ui/shadcn/form'
import { RosterAssignment } from '@/app/lib/formSchemas';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getUserSession } from '@/app/lib/session';

type Props = {
  selected?: string;
  shifts: Shift[];
  assignment: RosterAssignment;
  day: number;
};

const EditShiftBtn: FC<Props> = ({ selected, shifts, assignment, day }) => {
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

  // create the form for the dialog
  const FormSchema = z.object({
    shift: z
      .string().nullable()
  })
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      shift: selected
    }
  })

  // console.log("selected: ", selected)
  // console.log("shifts: ", shifts)
  // console.log("assignment: ", assignment)

  function onSubmit(data: z.infer<typeof FormSchema>) {

    if (data.shift === "off") {
      data.shift = null 
    }

    fetch('/api/prisma/roster', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({shift: data.shift, day: day, assignment: assignment}),
    })

    
  }

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
            Select the new shift. Click Save changes when you{'\''}re done.
          </Dialog.Description>
          <fieldset className='Fieldset'>
            <label className='Label' htmlFor='shiftSelect'>
              Select Shift
            </label>

            {/* form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="shift"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value!}>
                        <FormControl>
                          <SelectTrigger className='w-[180px]'>
                            <SelectValue placeholder='Select a shift' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>{shiftOptions}</SelectContent>
                      </Select>
                    </FormItem>
                  )}/>

                {/* <Dialog.Close asChild> */}
                  <Button
                    type='submit'
                    className="mt-4"
                  >
                    Save changes
                  </Button>
                {/* </Dialog.Close> */}
              </form>
            </Form>
          </fieldset>
          <div
            style={{
              display: 'flex',
              marginTop: 25,
              justifyContent: 'flex-end',
            }}
          >
          </div>
          <Dialog.Close asChild>
            <button className='IconButton' aria-label='Close'>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditShiftBtn;
