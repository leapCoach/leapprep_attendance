"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  formatDate,
  isTodayOrPast,
  getDisplayDate,
} from "@/src/utils/dateHelpers";

interface DateSelectorProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export default function DateSelector({
  selectedDate,
  onDateChange,
}: DateSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const selectedDateObj = new Date(selectedDate);

  const handleDateSelect = (date: Date | undefined) => {
    if (date && isTodayOrPast(date)) {
      onDateChange(formatDate(date));
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            getDisplayDate(selectedDate)
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDateObj}
          onSelect={handleDateSelect}
          disabled={(date) => !isTodayOrPast(date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
