import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface BaseFieldProps {
  label: string;
  required?: boolean;
  error?: string;
}

interface InputFieldProps extends BaseFieldProps {
  type: "text" | "number" | "email";
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
}

interface TextareaFieldProps extends BaseFieldProps {
  type: "textarea";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

interface SelectFieldProps extends BaseFieldProps {
  type: "select";
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
}

type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

export function FormField(props: FormFieldProps) {
  const { label, required, error } = props;

  return (
    <div className="space-y-2">
      <Label className="text-white">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </Label>
      
      {props.type === "textarea" ? (
        <Textarea
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder={props.placeholder}
          rows={props.rows || 3}
          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500 transition-colors"
          required={required}
        />
      ) : props.type === "select" ? (
        <Select value={props.value} onValueChange={props.onChange} required={required}>
          <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-purple-500 transition-colors">
            <SelectValue placeholder={props.placeholder} />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-white/20 text-white">
            {props.options.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-white focus:bg-white/10">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          type={props.type}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder={props.placeholder}
          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500 transition-colors"
          required={required}
        />
      )}
      
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}
