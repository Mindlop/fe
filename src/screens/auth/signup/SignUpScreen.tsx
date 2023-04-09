import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import ConfirmButton from "../../../components/button/ConfirmButton";
import InputPassword from "../../../components/form/InputPassword";
import InputText from "../../../components/form/InputText";
import Head from "../../../components/head/Head";
import Link from "../../../components/link/Link";
import SitePath from "../../../data/sitePath";

export default function SignUpScreen() {
  const navigate = useNavigate();
  const [nameVal, setNameVal] = createSignal("");
  const [emailVal, setEmailVal] = createSignal("");
  const [usernameVal, setUsernameVal] = createSignal("");
  const [passwordVal, setPasswordVal] = createSignal("");
  const [nameFieldError, setNameFieldError] = createSignal<string>();
  const [emailFieldError, setEmailFieldError] = createSignal<string>();
  const [usernameFieldError, setUsernameFieldError] = createSignal<string>();
  const [passwordFieldError, setPasswordFieldError] = createSignal<string>();

  function signup(
    e: Event & {
      submitter: HTMLElement;
    } & {
      currentTarget: HTMLFormElement;
      target: Element;
    }
  ) {
    e.preventDefault();

    const [name, email, username, password] = [
      nameVal(),
      emailVal().trim().toLowerCase(),
      usernameVal(),
      passwordVal(),
    ];
    const formValidity = testFormValidity(name, email, username, password);
    if (formValidity.name) setNameFieldError(formValidity.name);
    if (formValidity.username) setUsernameFieldError(formValidity.username);
    if (formValidity.email) setEmailFieldError(formValidity.email);
    if (formValidity.password) setPasswordFieldError(formValidity.password);
    for (const f of Object.values(formValidity)) if (f) return;

    navigate(SitePath.verifySignupHref, { state: { name, email } });
  }

  function changeName(name: string) {
    if (nameFieldError()) setNameFieldError();
    setNameVal(name);
  }

  function changeEmail(email: string) {
    if (emailFieldError()) setEmailFieldError();
    setEmailVal(email);
  }

  function changeUsername(username: string) {
    if (usernameFieldError()) setUsernameFieldError();
    setUsernameVal(username);
  }

  function changePassword(password: string) {
    if (passwordFieldError()) setPasswordFieldError();
    setPasswordVal(password);
  }

  return (
    <>
      <Head title="Sign up" />

      <div>
        <div class="w-fit mx-auto font-bold text-3xl">
          <span class="block text-center">Create an account</span>
        </div>

        <form class="mt-8" onsubmit={signup}>
          <div class="space-y-3">
            <div>
              <InputText
                labelText="NAME"
                labelClass="text-sm"
                inputName="name"
                inputType="text"
                inputValue={nameVal()}
                inputOnInput={(e) => changeName(e.currentTarget.value)}
                inputRequired
                error={nameFieldError()}
              />
            </div>
            <div>
              <InputText
                labelText="EMAIL"
                labelClass="text-sm"
                inputName="email"
                inputType="text"
                inputValue={emailVal()}
                inputOnInput={(e) => changeEmail(e.currentTarget.value)}
                inputRequired
                error={emailFieldError()}
              />
            </div>
            <div>
              <InputText
                labelText="USERNAME"
                labelClass="text-sm"
                inputName="username"
                inputType="text"
                inputValue={usernameVal()}
                inputOnInput={(e) => changeUsername(e.currentTarget.value)}
                inputRequired
                error={usernameFieldError()}
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
            </div>
          </div>
          <div class="mt-4">
            <ConfirmButton type="submit">Sign up</ConfirmButton>
          </div>
          <div class="mt-2 text-sm">
            <span>Already have an account? </span>
            <Link href={SitePath.signinHref}>Sign in</Link>
          </div>
        </form>
      </div>
    </>
  );
}

function testFormValidity(
  name?: string,
  email?: string,
  username?: string,
  password?: string
) {
  const nameValidity = (() => {
    if (!name) {
      return "Name is required";
    }
  })();
  const usernameValidity = (() => {
    if (username) {
      const regExp = /([A-Za-z0-9_]+)/;
      if (!regExp.test(username)) {
        return "Username can only contain letters, numbers, and underscore";
      } else if (username.length <= 4) {
        return "Username must be longer than 4 characters";
      }
    } else {
      return "Username is required";
    }
  })();
  const emailValidity = (() => {
    if (email) {
      const regExp = /\S+@\S+\.\S+/;
      if (!regExp.test(email)) {
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
    name: nameValidity,
    username: usernameValidity,
    email: emailValidity,
    password: passwordValidity,
  };
}
