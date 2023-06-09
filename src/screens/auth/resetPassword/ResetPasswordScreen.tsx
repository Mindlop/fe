import { useLocation, useNavigate } from "@solidjs/router";
import { createRenderEffect, createSignal } from "solid-js";
import PrimaryButton from "../../../components/button/PrimaryButton";
import InputText from "../../../components/form/InputText";
import Head from "../../../components/head/Head";
import SitePath from "../../../data/sitePath";
import useAuth from "../../../hooks/useAuth";
import showGqlError from "../../../utils/showGqlError";

export default function ResetPasswordScreen() {
  const location = useLocation<{ email?: string }>();
  const navigate = useNavigate();
  const { verifyRequestResetPassword: useVerifyRequestResetPassword } =
    useAuth();
  const [codeVal, setCodeVal] = createSignal("");
  const [codeFieldError, setCodeFieldError] = createSignal<string>();
  const [isLoadingResetPassword, setIsLoadingResetPassword] =
    createSignal(false);

  createRenderEffect(() => {
    if (!location.state?.email) {
      navigate(SitePath.signInHref, { replace: true });
    }
  });

  async function verifyCode(
    e: MouseEvent & {
      currentTarget: HTMLDivElement;
      target: Element;
    }
  ) {
    e.preventDefault();

    if (isLoadingResetPassword()) return;

    const code = codeVal();

    // Validate form
    const formValidity = testFormValidity(code);
    if (formValidity.code) {
      setCodeFieldError(formValidity.code);
      return;
    }

    try {
      setIsLoadingResetPassword(true);

      await useVerifyRequestResetPassword(location.state?.email!, code);

      navigate(SitePath.newPasswordHref, {
        state: { email: location.state?.email, code },
        replace: true,
      });
    } catch (e) {
      showGqlError(e);
    } finally {
      setIsLoadingResetPassword(false);
    }
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
          <span class="block text-center opacity-80">
            A verification code is sent to {location.state?.email}
          </span>
        </div>

        <div role="form" class="mt-8">
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
            <PrimaryButton
              onclick={verifyCode}
              isLoading={isLoadingResetPassword()}
              class="py-2 px-2"
            >
              Verify
            </PrimaryButton>
          </div>
        </div>
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
