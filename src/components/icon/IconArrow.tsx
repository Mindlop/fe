import { Match, Switch } from "solid-js";

interface Props {
  class?: string;
  direction: "back";
}

export default function IconArrow(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={props.class}
      viewBox="0 0 512 512"
    >
      <Switch>
        <Match when={props.direction === "back"}>
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="48"
            d="M244 400L100 256l144-144M120 256h292"
          />
        </Match>
      </Switch>
    </svg>
  );
}
