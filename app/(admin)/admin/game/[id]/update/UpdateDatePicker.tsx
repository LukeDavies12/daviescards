import { useEffect, useState } from 'react';

interface DatePickerProps {
  name: string;
  onDateChange: (date: Date | undefined) => void;
  required?: boolean;
  initialDate?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({ name, onDateChange, required, initialDate }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialDate);

  useEffect(() => {
    setSelectedDate(initialDate);
  }, [initialDate]);

  const handleChange = (date: Date | undefined) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <input
      type="date"
      name={name}
      required={required}
      value={selectedDate ? selectedDate.toISOString().substr(0, 10) : ''}
      onChange={(e) => handleChange(e.target.value ? new Date(e.target.value) : undefined)}
    />
  );
};

export default DatePicker;
