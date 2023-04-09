import { useLocation, useNavigate } from "@solidjs/router";
import { createRenderEffect, createSignal } from "solid-js";
import ConfirmButton from "../../../components/button/ConfirmButton";
import InputText from "../../../components/form/InputText";
import Head from "../../../components/head/Head";
import SitePath from "../../../data/sitePath";

export default function ResetPasswordScreen() {
  const location = useLocation<{ email?: string }>();
  const navigate = useNavigate();
  const [codeVal, setCodeVal] = createSignal("");
  const [codeFieldError, setCodeFieldError] = createSignal<string>();

  createRenderEffect(() => {
    if (!location.state?.email) {
      navigate(SitePath.signinHref, { replace: true });
    }
  });

  function verifyCode(
    e: Event & {
      submitter: HTMLElement;
    } & {
      currentTarget: HTMLFormElement;
      target: Element;
    }
  ) {
    e.preventDefault();

    const code = codeVal();
    const formValidity = testFormValidity(code);
    if (formValidity.code) {
      setCodeFieldError(formValidity.code);
      return;
    }

    navigate(SitePath.newPasswordHref, {
      state: { email: location.state?.email },
      replace: true,
    });
  }

  function changeCode(code: string) {
    if (codeFieldError()) setCodeFieldError();
    setCodeVal(code);
  }

  return (
    <>
      <Head title="Reset password" />

      <div>
        <div class="w-fit mx-auto font-bold text-3xl">
          <span class="block text-center">Reset password</span>
        </div>
        <div class="w-fit mx-auto mt-2">
          <span class="block text-center">
            A verification code is sent to {location.state?.email}
          </span>
        </div>

        <form class="mt-8" onsubmit={verifyCode}>
          <div>
            <InputText
              labelText="VERIFICATION CODE"
              labelClass="text-sm"
              inputName="code"
              inputType="text"
              inputValue={codeVal()}
              inputOnInput={(e) => changeCode(e.currentTarget.value)}
              inputRequired
              error={codeFieldError()}
            />
          </div>
          <div class="mt-4">
            <ConfirmButton type="submit">Verify</ConfirmButton>
          </div>
        </form>
      </div>
    </>
  );
}

function testFormValidity(code?: string) {
  const codeValidity = (() => {
    if (!code) {
      return "Verification code is required";
    }
  })();

  return {
    code: codeValidity,
  };
}
