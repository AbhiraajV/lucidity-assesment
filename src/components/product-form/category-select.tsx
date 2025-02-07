import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface CategoryFieldProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export const CategoryField: React.FC<CategoryFieldProps> = ({ value, options, onChange }) => {
  const [isCustom, setIsCustom] = useState(false);

  const handleToggle = () => {
    setIsCustom((prev) => !prev);
    onChange('');
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="category">Category</Label>
      {isCustom ? (
        <Input
          id="custom-category"
          placeholder="Enter custom category"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent position="popper">
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <button
        type="button"
        onClick={handleToggle}
        className="text-blue-500 underline text-sm mt-1 self-start"
      >
        {isCustom ? 'Choose from existing categories' : 'Enter custom category'}
      </button>
    </div>
  );
};
