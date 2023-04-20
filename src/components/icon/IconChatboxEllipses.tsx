import { Match, Switch } from "solid-js";

interface Props {
  class?: string;
  iconStyle?: "outline" | "fill";
}

export default function IconChatboxEllipses(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={props.class}
      viewBox="0 0 512 512"
    >
      <Switch
        fallback={
          <>
            <path
              d="M408 64H104a56.16 56.16 0 00-56 56v192a56.16 56.16 0 0056 56h40v80l93.72-78.14a8 8 0 015.13-1.86H408a56.16 56.16 0 0056-56V120a56.16 56.16 0 00-56-56z"
              fill="none"
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="32"
            />
            <circle cx="160" cy="216" r="32" />
            <circle cx="256" cy="216" r="32" />
            <circle cx="352" cy="216" r="32" />
          </>
        }
      >
        <Match when={props.iconStyle === "fill"}>
          <path d="M408 48H104a72.08 72.08 0 00-72 72v192a72.08 72.08 0 0072 72h24v64a16 16 0 0026.25 12.29L245.74 384H408a72.08 72.08 0 0072-72V120a72.08 72.08 0 00-72-72zM160 248a32 32 0 1132-32 32 32 0 01-32 32zm96 0a32 32 0 1132-32 32 32 0 01-32 32zm96 0a32 32 0 1132-32 32 32 0 01-32 32z" />
        </Match>
      </Switch>
    </svg>
  );
}
