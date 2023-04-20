import { Match, Switch } from "solid-js";

interface Props {
  class?: string;
  iconStyle?: "outline" | "fill";
}

export default function IconCalendar(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={props.class}
      viewBox="0 0 512 512"
    >
      <Switch
        fallback={
          <>
            <rect
              fill="none"
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="32"
              x="48"
              y="80"
              width="416"
              height="384"
              rx="48"
            />
            <circle cx="296" cy="232" r="24" />
            <circle cx="376" cy="232" r="24" />
            <circle cx="296" cy="312" r="24" />
            <circle cx="376" cy="312" r="24" />
            <circle cx="136" cy="312" r="24" />
            <circle cx="216" cy="312" r="24" />
            <circle cx="136" cy="392" r="24" />
            <circle cx="216" cy="392" r="24" />
            <circle cx="296" cy="392" r="24" />
            <path
              fill="none"
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="32"
              stroke-linecap="round"
              d="M128 48v32M384 48v32"
            />
            <path
              fill="none"
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="32"
              d="M464 160H48"
            />
          </>
        }
      >
        <Match when={props.iconStyle === "fill"}>
          <path d="M480 128a64 64 0 00-64-64h-16V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 00368 48v16H144V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 00112 48v16H96a64 64 0 00-64 64v12a4 4 0 004 4h440a4 4 0 004-4zM32 416a64 64 0 0064 64h320a64 64 0 0064-64V179a3 3 0 00-3-3H35a3 3 0 00-3 3zm344-208a24 24 0 11-24 24 24 24 0 0124-24zm0 80a24 24 0 11-24 24 24 24 0 0124-24zm-80-80a24 24 0 11-24 24 24 24 0 0124-24zm0 80a24 24 0 11-24 24 24 24 0 0124-24zm0 80a24 24 0 11-24 24 24 24 0 0124-24zm-80-80a24 24 0 11-24 24 24 24 0 0124-24zm0 80a24 24 0 11-24 24 24 24 0 0124-24zm-80-80a24 24 0 11-24 24 24 24 0 0124-24zm0 80a24 24 0 11-24 24 24 24 0 0124-24z" />
        </Match>
      </Switch>
    </svg>
  );
}
