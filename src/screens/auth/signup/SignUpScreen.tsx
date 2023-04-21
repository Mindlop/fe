import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import PrimaryButton from "../../../components/button/PrimaryButton";
import InputDate from "../../../components/form/InputDate";
import InputPassword from "../../../components/form/InputPassword";
import InputText from "../../../components/form/InputText";
import Head from "../../../components/head/Head";
import Link from "../../../components/link/Link";
import SitePath from "../../../data/sitePath";
import useAuth from "../../../hooks/useAuth";
import showGqlError from "../../../utils/showGqlError";

export default function SignUpScreen() {
  const navigate = useNavigate();
  const { signUp: useSignUp } = useAuth();
  const [nameVal, setNameVal] = createSignal("");
  const [emailVal, setEmailVal] = createSignal("");
  const [usernameVal, setUsernameVal] = createSignal("");
  const [passwordVal, setPasswordVal] = createSignal("");
  const [dateOfBirthVal, setDateOfBirthVal] = createSignal("");
  const [nameFieldError, setNameFieldError] = createSignal<string>();
  const [emailFieldError, setEmailFieldError] = createSignal<string>();
  const [usernameFieldError, setUsernameFieldError] = createSignal<string>();
  const [passwordFieldError, setPasswordFieldError] = createSignal<string>();
  const [dateOfBirthFieldError, setDateOfBirthFieldError] =
    createSignal<string>();
  const [isLoadingSignUp, setIsLoadingSignUp] = createSignal(false);

  async function signUp(
    e: MouseEvent & {
      currentTarget: HTMLDivElement;
      target: Element;
    }
  ) {
    e.preventDefault();

    if (isLoadingSignUp()) return;

    const [name, email, username, password, dateOfBirth] = [
      nameVal(),
      emailVal().trim().toLowerCase(),
      usernameVal(),
      passwordVal(),
      dateOfBirthVal(),
    ];

    // Validate form
    const formValidity = testFormValidity(
      name,
      email,
      username,
      password,
      dateOfBirth
    );
    if (formValidity.name) setNameFieldError(formValidity.name);
    if (formValidity.username) setUsernameFieldError(formValidity.username);
    if (formValidity.email) setEmailFieldError(formValidity.email);
    if (formValidity.password) setPasswordFieldError(formValidity.password);
    if (formValidity.dateOfBirth)
      setDateOfBirthFieldError(formValidity.dateOfBirth);
    for (const f of Object.values(formValidity)) if (f) return;

    try {
      setIsLoadingSignUp(true);

      await useSignUp(name, email, username, password, dateOfBirth);

      navigate(SitePath.verifySignupHref, { state: { name, email } });
    } catch (e) {
      showGqlError(e);
    } finally {
      setIsLoadingSignUp(false);
    }
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

  function changeDateOfBirth(date: string) {
    if (dateOfBirthFieldError()) setDateOfBirthFieldError();
    setDateOfBirthVal(date);
  }

  return (
    <>
      <Head title="Sign up" />

      <div>
        <div class="w-fit mx-auto font-bold text-3xl">
          <span class="block text-center">Create an account</span>
        </div>

        <div role="form" class="mt-8">
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
                inputType="email"
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
            <div>
              <InputDate
                labelText="DATE OF BIRTH"
                labelClass="text-sm"
                inputName="date_of_birth"
                inputValue={dateOfBirthVal()}
                inputOnInput={(e) => changeDateOfBirth(e.currentTarget.value)}
                inputRequired
                error={dateOfBirthFieldError()}
              />
            </div>
          </div>
          <div class="mt-4">
            <PrimaryButton
              onclick={signUp}
              isLoading={isLoadingSignUp()}
              class="py-2 px-2"
            >
              Sign up
            </PrimaryButton>
          </div>
          <div class="mt-2 text-sm">
            <span>Already have an account? </span>
            <Link href={SitePath.signinHref}>Sign in</Link>
          </div>
        </div>
      </div>
    </>
  );
}

function testFormValidity(
  name?: string,
  email?: string,
  username?: string,
  password?: string,
  dateOfBirth?: string
) {
  const nameValidity = (() => {
    if (!name) {
      return "Name is required";
    }
  })();
  const usernameValidity = (() => {
    if (username) {
      const usernameRegExp = /^[A-Za-z0-9_]*$/;
      if (username.length <= 4) {
        return "Username must be longer than 4 characters";
      } else if (username.length >= 15) {
        return "Username must be less than 15 characters";
      } else if (!usernameRegExp.test(username)) {
        return "Username can only contain letters, numbers, and underscore";
      }
    } else {
      return "Username is required";
    }
  })();
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
  const dateOfBirthValidity = (() => {
    if (!dateOfBirth) {
      return "Date of birth is required";
    }
  })();

  return {
    name: nameValidity,
    username: usernameValidity,
    email: emailValidity,
    password: passwordValidity,
    dateOfBirth: dateOfBirthValidity,
  };
}
