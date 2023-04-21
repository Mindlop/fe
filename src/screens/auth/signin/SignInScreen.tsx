import { useNavigate } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import PrimaryButton from "../../../components/button/PrimaryButton";
import InputPassword from "../../../components/form/InputPassword";
import InputText from "../../../components/form/InputText";
import Head from "../../../components/head/Head";
import Link from "../../../components/link/Link";
import LoadingSpinner from "../../../components/loading/LoadingSpinner";
import SitePath from "../../../data/sitePath";
import useAuth from "../../../hooks/useAuth";
import showGqlError from "../../../utils/showGqlError";

export default function SignInScreen() {
  const navigate = useNavigate();
  const { signIn: useSignIn, requestResetPassword: useRequestResetPassword } =
    useAuth();
  const [emailVal, setEmailVal] = createSignal("");
  const [passwordVal, setPasswordVal] = createSignal("");
  const [emailFieldError, setEmailFieldError] = createSignal<string>();
  const [passwordFieldError, setPasswordFieldError] = createSignal<string>();
  const [isLoadingSignIn, setIsLoadingSignIn] = createSignal(false);
  const [isLoadingResetPassword, setIsLoadingResetPassword] =
    createSignal(false);

  async function resetPassword() {
    if (isLoadingResetPassword()) return;

    const email = emailVal().trim().toLowerCase();

    // Validate form
    const formValidity = testFormValidity(email, undefined);
    if (formValidity.email) {
      setEmailFieldError(formValidity.email);
      return;
    }

    try {
      setIsLoadingResetPassword(true);

      useRequestResetPassword(email);

      navigate(SitePath.resetPasswordHref, { state: { email } });
    } catch (e) {
      showGqlError(e);
    } finally {
      setIsLoadingResetPassword(false);
    }
  }

  async function signIn(
    e: MouseEvent & {
      currentTarget: HTMLDivElement;
      target: Element;
    }
  ) {
    e.preventDefault();

    if (isLoadingSignIn()) return;

    const [email, password] = [emailVal().trim().toLowerCase(), passwordVal()];

    // Validate form
    const formValidity = testFormValidity(email, password);
    if (formValidity.email) setEmailFieldError(formValidity.email);
    if (formValidity.password) setPasswordFieldError(formValidity.password);
    for (const f of Object.values(formValidity)) if (f) return;

    try {
      setIsLoadingSignIn(true);

      await useSignIn(email, password);

      navigate(SitePath.appHref, { replace: true });
    } catch (e) {
      showGqlError(e);
    } finally {
      setIsLoadingSignIn(false);
    }
  }

  function changeEmail(email: string) {
    if (emailFieldError()) setEmailFieldError();
    setEmailVal(email);
  }

  function changePassword(password: string) {
    if (passwordFieldError()) setPasswordFieldError();
    setPasswordVal(password);
  }

  return (
    <>
      <Head title="Sign in" />

      <div>
        <div>
          <div class="w-fit mx-auto font-bold text-3xl">
            <span class="block text-center">Sign in</span>
          </div>
          <div class="w-fit mx-auto mt-2">
            <span class="block text-center opacity-80">Welcome back!</span>
          </div>
        </div>

        <div role="form" class="mt-8">
          <div class="space-y-3">
            <div>
              <InputText
                labelText="EMAIL"
                labelClass="text-sm"
                inputName="email"
                inputType="email"
                inputValue={emailVal()}
                inputOnInput={(e) => changeEmail(e.currentTarget.value)}
                inputRequired
                error={emailFieldError()}
              />
            </div>
            <div>
              <InputPassword
                labelText="PASSWORD"
                labelClass="text-sm"
                inputName="password"
                inputValue={passwordVal()}
                inputOnInput={(e) => changePassword(e.currentTarget.value)}
                inputRequired
                error={passwordFieldError()}
              />
              <div
                role="button"
                onclick={!isLoadingResetPassword() ? resetPassword : undefined}
                class="mt-0.5 flex items-center gap-x-2 text-sky-600 hover:underline text-sm"
              >
                <span>Forgot your password?</span>
                <Show when={isLoadingResetPassword()}>
                  <span>
                    <LoadingSpinner size="4" />
                  </span>
                </Show>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <PrimaryButton
              onclick={signIn}
              isLoading={isLoadingSignIn()}
              class="py-2 px-2"
            >
              Sign in
            </PrimaryButton>
          </div>
          <div class="mt-2 text-sm">
            <span>Don't have an account? </span>
            <Link href={SitePath.signupHref}>Sign up</Link>
          </div>
        </div>
      </div>
    </>
  );
}

function testFormValidity(email?: string, password?: string) {
  const emailValidity = (() => {
    if (email) {
      const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]*/;
      if (!emailRegExp.test(email)) {
        return "Email is not valid";
      }
    } else {
      return "Email is required";
    }
  })();
  const passwordValidity = (() => {
    if (password) {
      if (password.length < 8) {
        return "Password must be longer than 8 characters";
      }
    } else {
      return "Password is required";
    }
  })();

  return {
    email: emailValidity,
    password: passwordValidity,
  };
}
