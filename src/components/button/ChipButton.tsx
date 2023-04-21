import { JSXElement, Show } from "solid-js";

interface Props {
  onclick?: (
    e: MouseEvent & {
      currentTarget: HTMLDivElement;
      target: Element;
    }
  ) => void;
  prefixComponent?: JSXElement;
  children: JSXElement;
  suffixComponent?: JSXElement;
  class?: string;
}

export default function ChipButton(props: Props) {
  return (
    <div
      role="button"
      onclick={props.onclick}
      class={`w-fit py-0.5 px-2 flex items-center gap-x-1 text-sm border border-gray-300 active:bg-gray-200 rounded-md${
        props.class ? ` ${props.class}` : ""
      }`}
    >
      <Show when={props.prefixComponent}>{props.prefixComponent}</Show>
      {props.children}
      <Show when={props.suffixComponent}>{props.suffixComponent}</Show>
    </div>
  );
}
