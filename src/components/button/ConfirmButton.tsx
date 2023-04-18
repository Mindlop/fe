import { JSXElement, Show } from "solid-js";
import LoadingSpinner from "../loading/LoadingSpinner";

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
  isLoading?: boolean;
}

export default function ConfirmButton(props: Props) {
  return (
    <button
      type={props.type}
      onclick={!props.isLoading ? props.onclick : undefined}
      class={`w-full p-2 bg-sky-400 hover:bg-sky-500 active:bg-sky-600 text-white rounded-md${
        props.class ? ` ${props.class}` : ""
      }`}
    >
      <Show
        when={!props.isLoading}
        fallback={
          <div class="w-fit mx-auto p-0.5">
            <LoadingSpinner />
          </div>
        }
      >
        {props.children}
      </Show>
    </button>
  );
}
