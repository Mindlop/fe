import { Match, Switch } from "solid-js";

interface Props {
  class?: string;
  iconStyle?: "outline" | "fill";
}

export default function IconClose(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={props.class}
      viewBox="0 0 512 512"
    >
      <Switch
        fallback={
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M368 368L144 144M368 144L144 368"
          />
        }
      >
        <Match when={props.iconStyle === "fill"}>
          <path
            fill="currentColor"
            d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"
          />
        </Match>
      </Switch>
    </svg>
  );
}
