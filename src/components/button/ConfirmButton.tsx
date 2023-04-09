import { createMemo, JSXElement } from "solid-js";

interface Props {
  type?: "submit" | "reset" | "button";
  onclick?: (
    e: MouseEvent & {
      currentTarget: HTMLButtonElement;
      target: Element;
    }
  ) => void;
  class?: string;
  children: JSXElement;
}

export default function ConfirmButton(props: Props) {
  const className = createMemo(
    () =>
      `w-full p-2 bg-sky-400 hover:bg-sky-500 active:bg-sky-600 text-white rounded-md${
        props.class ? ` ${props.class}` : ""
      }`
  );

  return (
    <button type={props.type} onclick={props.onclick} class={className()}>
      {props.children}
    </button>
  );
}
