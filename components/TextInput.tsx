import React from "react";

type Props = {
  labelText: string;
  placeholder: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
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
    </div>
  );
}
