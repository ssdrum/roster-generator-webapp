import { RosterAssignment } from '@/app/lib/formSchemas';
import { Button } from '@/app/ui/shadcn/button';
import { Form, FormControl, FormField, FormItem } from '@/app/ui/shadcn/form';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/app/ui/shadcn/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/ui/shadcn/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Shift } from '@prisma/client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {
  shifts: Shift[];
  assignment: RosterAssignment;
  day: number;
};

export default function AddShift({ shifts, assignment, day }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const shiftOptions = [
    ...shifts.map((shift) => (
      <SelectItem key={shift.id} value={shift.id}>
        {shift.name}
      </SelectItem>
    )),
  ];

  // create the form for the dialog
  const FormSchema = z.object({
    shift: z.string().nullable(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    fetch('/api/prisma/roster', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shift: data.shift,
        day: day,
        assignment: assignment,
      }),
    });
  }

  return (
    <div
      className='flex h-full flex-col justify-center'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='flex h-[100px] items-center justify-center'>
        {' '}
        {/* Invisible trigger */}
        {isHovered && (
          <Dialog>
            <DialogTrigger>Add Shift</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select a new shift to assign</DialogTitle>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name='shift'
                      render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select a shift' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>{shiftOptions}</SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <Button type='submit'>Add Shift</Button>
                  </form>
                </Form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
