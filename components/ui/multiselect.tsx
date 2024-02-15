'use client';

import * as React from 'react';
import { X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import { Dispatcher } from '@/types';

export type Options = {
  id: string;
  value: string;
  label: string | React.ReactNode;
};

interface FancyMultiSelectProps {
  options?: Options[];
  placeholder: string;
  select?: unknown;
  onSelect?: Dispatcher<Options[]>;
}

export function FancyMultiSelect({
  options,
  placeholder,
  select,
  onSelect,
}: FancyMultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Options[]>([]);
  const [inputValue, setInputValue] = React.useState('');

  const selectStateToUse = onSelect ?? setSelected;
  const selectValueToUse = (select ?? selected) as unknown as Options[];

  const handleUnselect = React.useCallback(
    (options: Options) => {
      selectStateToUse((prev) => prev.filter((s) => s.value !== options.value));
    },
    [selectStateToUse]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            selectStateToUse((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    [selectStateToUse]
  );

  const selectables: Options[] = [];
  options?.map((option) => {
    const hasVal = selectValueToUse.filter((e) => e.id === option.id);

    if (hasVal.length === 0) {
      selectables.push(option);
    }
  });

  // const selectables = options?.filter(
  //   (option) => !shallowEqualityCheck(selectValueToUse, option)
  // );

  // const valueToUse = inputVal ?? inputValue
  // const onSelectToUse = onSelect ?? setInputValue

  return (
    <Command
      onKeyDown={handleKeyDown}
      className='overflow-visible bg-transparent'
    >
      <div className='group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
        <div className='flex gap-1 flex-wrap'>
          {selectValueToUse.map((option) => {
            return (
              <Badge key={option.value} variant='secondary'>
                {option.label}
                <button
                  className='ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(option);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(option)}
                >
                  <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className='ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1'
          />
        </div>
      </div>
      <div className='relative mt-2'>
        {open && selectables && selectables.length > 0 ? (
          <div className='absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in'>
            <CommandGroup className='h-full overflow-auto'>
              {selectables.map((option) => {
                return (
                  <CommandItem
                    key={option.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue('');
                      selectStateToUse((prev) => [...prev, option]);
                    }}
                    className={'cursor-pointer'}
                  >
                    {option.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
}
