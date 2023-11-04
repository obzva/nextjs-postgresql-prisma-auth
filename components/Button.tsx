import React from "react";

type Props = {
  buttonType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  buttonText: string;
  onClick?: () => void;
};

export default function Button(props: Props) {
  return (
    <button
      type={props.buttonType ?? "button"}
      className="w-full bg-slate-800 rounded-md flex justify-center items-center py-2 text-white"
      onClick={props.onClick ?? (() => {})}
    >
      {props.buttonText}
    </button>
  );
}
