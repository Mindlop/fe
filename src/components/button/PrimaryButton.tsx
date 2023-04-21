import { JSXElement, Show } from "solid-js";
import LoadingSpinner from "../loading/LoadingSpinner";

interface Props {
  onclick?: (
    e: MouseEvent & {
      currentTarget: HTMLDivElement;
      target: Element;
    }
  ) => void;
  class?: string;
  children: JSXElement;
  isLoading?: boolean;
}

export default function Primary(props: Props) {
  return (
    <div
      role="button"
      onclick={!props.isLoading ? props.onclick : undefined}
      class={`w-full py-1 px-3 text-center bg-sky-400 hover:bg-sky-500 active:bg-sky-600 text-white rounded-md${
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
    </div>
  );
}
