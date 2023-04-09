import { createMemo, JSXElement, Show } from "solid-js";

interface Props {
  labelText?: string;
  labelClass?: string;
  inputName?: string;
  inputType?: string;
  inputValue?: string | number | string[];
  inputOnInput?: (
    e: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) => void;
  inputRequired?: boolean;
  inputSuffix?: JSXElement;
  error?: string;
}

export default function InputText(props: Props) {
  const labelClass = createMemo(
    () => `block mb-1${props.labelClass ? ` ${props.labelClass}` : ""}`
  );

  return (
    <div>
      <Show when={props.labelText}>
        <label class={labelClass()}>
          <span classList={{ "text-red-500": !!props.error }}>
            {props.labelText}
          </span>
          <Show when={props.inputRequired}>
            <span class="text-red-500"> *</span>
          </Show>
        </label>
      </Show>
      <div
        class="py-1.5 px-2 flex items-center border rounded-md"
        classList={{
          "focus-within:border-sky-400": !props.error,
          "border-red-500": !!props.error,
        }}
      >
        <input
          name={props.inputName}
          type={props.inputType}
          value={props.inputValue}
          oninput={props.inputOnInput}
          autocomplete="off"
          autocorrect="off"
          class="w-full appearance-none outline-none"
        />
        <Show when={props.inputSuffix}>
          <div class="pl-2">{props.inputSuffix}</div>
        </Show>
      </div>
      <Show when={props.error}>
        <div>
          <span class="text-red-500 text-sm italic">{props.error}</span>
        </div>
      </Show>
    </div>
  );
}
