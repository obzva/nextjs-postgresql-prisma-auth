import React from "react";
import Gnb from "@/components/Gnb";

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  return (
    <>
      <Gnb />
      {props.children}
    </>
  );
}
