import { JSXElement, Show } from "solid-js";

interface Props {
  ref?: HTMLInputElement | ((el: HTMLInputElement) => void);
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
  inputClass?: string;
  error?: string;
}

export default function InputText(props: Props) {
  return (
    <div>
      <Show when={props.labelText}>
        <label
          class={`block mb-1${props.labelClass ? ` ${props.labelClass}` : ""}`}
        >
          <span class="font-bold" classList={{ "text-red-500": !!props.error }}>
            {props.labelText}
          </span>
          <Show when={props.inputRequired}>
            <span class="font-bold text-red-500"> *</span>
          </Show>
          <Show when={props.error}>
            <span class="text-red-500">&nbsp;&nbsp;-&nbsp;&nbsp;</span>
            <span class="text-red-500 text-sm italic">{props.error}</span>
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
          ref={props.ref}
          name={props.inputName}
          type={props.inputType}
          value={props.inputValue}
          oninput={props.inputOnInput}
          autocomplete="off"
          autocorrect="off"
          class={`w-full appearance-none outline-none bg-transparent${
            props.inputClass ? ` ${props.inputClass}` : ""
          }`}
        />
        <Show when={props.inputSuffix}>
          <div class="pl-2">{props.inputSuffix}</div>
        </Show>
      </div>
    </div>
  );
}
