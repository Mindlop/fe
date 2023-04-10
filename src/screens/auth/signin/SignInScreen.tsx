import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import ConfirmButton from "../../../components/button/ConfirmButton";
import InputPassword from "../../../components/form/InputPassword";
import InputText from "../../../components/form/InputText";
import Head from "../../../components/head/Head";
import Link from "../../../components/link/Link";
import SitePath from "../../../data/sitePath";

export default function SignInScreen() {
  const navigate = useNavigate();
  const [emailVal, setEmailVal] = createSignal("");
  const [passwordVal, setPasswordVal] = createSignal("");
  const [emailFieldError, setEmailFieldError] = createSignal<string>();
  const [passwordFieldError, setPasswordFieldError] = createSignal<string>();

  function resetPassword() {
    const email = emailVal().trim().toLowerCase();
    const formValidity = testFormValidity(email, undefined);
    if (formValidity.email) {
      setEmailFieldError(formValidity.email);
      return;
    }

    navigate(SitePath.resetPasswordHref, { state: { email } });
  }

  function signIn(
    e: Event & {
      submitter: HTMLElement;
    } & {
      currentTarget: HTMLFormElement;
      target: Element;
    }
  ) {
    e.preventDefault();

    const [email, password] = [emailVal().trim().toLowerCase(), passwordVal()];
    const formValidity = testFormValidity(email, password);
    if (formValidity.email) setEmailFieldError(formValidity.email);
    if (formValidity.password) setPasswordFieldError(formValidity.password);
    for (const f of Object.values(formValidity)) if (f) return;
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
            <span class="block text-center">Welcome back!</span>
          </div>
        </div>

        <form class="mt-8" onsubmit={signIn}>
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
              <button
                type="button"
                onclick={resetPassword}
                class="text-sky-600 hover:underline text-sm"
              >
                Forgot your password?
              </button>
            </div>
          </div>
          <div class="mt-4">
            <ConfirmButton type="submit">Sign in</ConfirmButton>
          </div>
          <div class="mt-2 text-sm">
            <span>Don't have an account? </span>
            <Link href={SitePath.signupHref}>Sign up</Link>
          </div>
        </form>
      </div>
    </>
  );
}

function testFormValidity(email?: string, password?: string) {
  const emailValidity = (() => {
    if (email) {
      const emailRegExp = /\S+@\S+\.\S+/;
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
