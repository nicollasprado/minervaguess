import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { HTMLInputTypeAttribute } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

interface BetInputProps {
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  inputType: HTMLInputTypeAttribute;
  name: string;
  onChangeFunc: () => void;
}

export default function BetInput({
  description,
  form,
  name,
  inputType,
  onChangeFunc,
}: BetInputProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className="flex flex-row-reverse">
          <FormLabel className="text-neutral-300">{description}</FormLabel>
          <FormControl>
            <Controller
              control={form.control}
              name={name}
              render={({ field }) => (
                <input
                  type={inputType}
                  pattern={
                    inputType === "text" || inputType === "number"
                      ? "^[1-9][0-9]{0,1}$"
                      : undefined
                  }
                  value={inputType === "checkbox" ? undefined : field.value}
                  checked={inputType === "checkbox" ? field.value : undefined}
                  onChange={(e) => {
                    if (inputType === "checkbox") {
                      field.onChange(e.target.checked);
                    } else {
                      field.onChange(e.target.value);
                    }

                    onChangeFunc();
                  }}
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  className={`bg-neutral-300 text-black text-lg text-center rounded-sm ${
                    inputType === "checkbox" ? "size-6" : "w-8 h-8"
                  }`}
                />
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
