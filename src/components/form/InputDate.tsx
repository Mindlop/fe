import CalendarMonth from "../icon/CalendarMonth";
import InputText from "./InputText";
import style from "./InputDate.module.css";

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

export default function InputDate(props: Props) {
  let inputRef: HTMLInputElement | undefined = undefined;

  return (
    <InputText
      ref={inputRef}
      labelText={props.labelText}
      labelClass={props.labelClass}
      inputName={props.inputName}
      inputType="date"
      inputValue={props.inputValue}
      inputOnInput={props.inputOnInput}
      inputRequired={props.inputRequired}
      inputSuffix={
        <button
          type="button"
          onclick={() => inputRef?.showPicker()}
          class="flex"
        >
          <CalendarMonth />
        </button>
      }
      inputClass={style.input}
      error={props.error}
    />
  );
}
