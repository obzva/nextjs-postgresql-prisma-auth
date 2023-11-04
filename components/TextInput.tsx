import React from "react";
import { FieldError } from "react-hook-form";

type Props = {
  labelText: string;
  placeholder: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  error?: FieldError;
  helperText?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TextInput(props: Props) {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={props.labelText}>{props.labelText}</label>
      <input
        className="w-64 p-2 rounded-sm"
        name={props.labelText}
        id={props.labelText}
        placeholder={props.placeholder}
        type={props.type ?? "text"}
        value={props.value}
        onChange={props.onChange}
      />
      {props.error ? (
        <p className={"text-red-500 text-sm"}>{`*${props.error.message}`}</p>
      ) : (
        props.helperText && (
          <p className={"text-gray-500 text-sm"}>{props.helperText}</p>
        )
      )}
    </div>
  );
}
