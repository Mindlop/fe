import { createSignal, Show } from "solid-js";
import InputText from "./InputText";
import IconEyeOff from "../icon/IconEyeOffOutline";
import IconEye from "../icon/IconEye";

interface Props {
  labelText?: string;
  labelClass?: string;
  inputName?: string;
  inputValue?: string | number | string[];
  inputOnInput?: (
    e: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) => void;
  inputRequired?: boolean;
  error?: string;
}

export default function InputPassword(props: Props) {
  const [isPasswordShown, setIsPasswordShown] = createSignal(false);

  return (
    <InputText
      labelText={props.labelText}
      labelClass={props.labelClass}
      inputName={props.inputName}
      inputType={isPasswordShown() ? "text" : "password"}
      inputValue={props.inputValue}
      inputOnInput={props.inputOnInput}
      inputRequired={props.inputRequired}
      inputSuffix={
        <button
          type="button"
          onclick={() => setIsPasswordShown((prev) => !prev)}
          class="flex"
        >
          <Show
            when={isPasswordShown()}
            fallback={<IconEyeOff class="h-5 w-5 text-gray-600" />}
          >
            <IconEye class="h-5 w-5 text-gray-600" />
          </Show>
        </button>
      }
      error={props.error}
    />
  );
}
