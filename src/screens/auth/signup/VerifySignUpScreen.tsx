import { useLocation, useNavigate } from "@solidjs/router";
import { createRenderEffect, createSignal } from "solid-js";
import PrimaryButton from "../../../components/button/PrimaryButton";
import InputText from "../../../components/form/InputText";
import Head from "../../../components/head/Head";
import SitePath from "../../../data/sitePath";
import useAuth from "../../../hooks/useAuth";
import showGqlError from "../../../utils/showGqlError";

export default function VerifySignUpScreen() {
  const location = useLocation<{ name?: string; email?: string }>();
  const navigate = useNavigate();
  const { verifySignUp: useVerifySignUp } = useAuth();
  const [codeVal, setCodeVal] = createSignal("");
  const [codeFieldError, setCodeFieldError] = createSignal<string>();
  const [isLoadingVerifySignUp, setIsLoadingVerifySignUp] = createSignal(false);

  createRenderEffect(() => {
    if (!location.state?.name || !location.state?.email) {
      navigate(SitePath.signupHref, { replace: true });
    }
  });

  async function verifySignUp(
    e: MouseEvent & {
      currentTarget: HTMLDivElement;
      target: Element;
    }
  ) {
    e.preventDefault();

    if (isLoadingVerifySignUp()) return;

    const code = codeVal();

    // Validate form
    const formValidity = testFormValidity(code);
    if (formValidity.code) {
      setCodeFieldError(formValidity.code);
      return;
    }

    try {
      setIsLoadingVerifySignUp(true);

      await useVerifySignUp(location.state?.email!, code);

      navigate(SitePath.signupSuccessHref, {
        state: { name: location.state?.name },
        replace: true,
      });
    } catch (e) {
      showGqlError(e);
    } finally {
      setIsLoadingVerifySignUp(false);
    }
  }

  function changeCode(code: string) {
    if (codeFieldError()) setCodeFieldError();
    setCodeVal(code);
  }

  return (
    <>
      <Head title="Verify sign up" />

      <div>
        <div class="w-fit mx-auto font-bold text-3xl">
          <span class="block text-center">Verify your email</span>
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
              onclick={verifySignUp}
              isLoading={isLoadingVerifySignUp()}
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
