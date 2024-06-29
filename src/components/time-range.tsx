import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Clock } from 'lucide-react';

const TimeRangeInput = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  return (
    <div className="flex items-center border border-gray-300 rounded px-2 ">
      <div className="flex items-center">
        <Input
          id="start-time"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border-none p-0 focus:ring-0"
        />
      </div>
      <span className="mx-2">-</span>
      <div className="flex items-center">
        <Input
          id="end-time"
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="border-none p-0 focus:ring-0"
        />
      </div>
    </div>
  );
};

export default TimeRangeInput;
