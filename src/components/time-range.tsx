import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface TimeRangeInputProps {
  entryTime: string;
  setEntryTime: (value: string) => void;
  departureTime: string;
  setDepartureTime: (value: string) => void;
}

const TimeRangeInput = ({
  entryTime,
  setEntryTime,
  departureTime,
  setDepartureTime,
}: TimeRangeInputProps) => {
  return (
    <div className="flex items-center border border-gray-300 rounded px-2 ">
      <div className="flex items-center">
        <Input
          id="start-time"
          type="time"
          value={entryTime}
          onChange={(e) => setEntryTime(e.target.value)}
          className="border-none p-0 focus:ring-0"
        />
      </div>
      <span className="mx-2">-</span>
      <div className="flex items-center">
        <Input
          id="end-time"
          type="time"
          value={departureTime}
          onChange={(e) => setDepartureTime(e.target.value)}
          className="border-none p-0 focus:ring-0"
        />
      </div>
    </div>
  );
};

export default TimeRangeInput;
