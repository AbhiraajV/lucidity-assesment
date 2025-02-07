import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface LabeledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export const LabeledInput = ({ label, id, ...props }:LabeledInputProps) => (
  <div className="flex flex-col gap-1">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} {...props} />
  </div>
);