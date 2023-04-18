import { JSX } from "solid-js";

interface Props {
  class?: string;
  onsubmit?: JSX.EventHandlerUnion<
    HTMLFormElement,
    Event & {
      submitter: HTMLElement;
    }
  >;
  children: JSX.Element;
}

export default function Form(props: Props) {
  return (
    <form novalidate onsubmit={props.onsubmit} class={props.class}>
      {props.children}
    </form>
  );
}
