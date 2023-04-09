import { useLocation, useNavigate } from "@solidjs/router";
import { createRenderEffect, createSignal } from "solid-js";
import ConfirmButton from "../../../components/button/ConfirmButton";
import InputPassword from "../../../components/form/InputPassword";
import Head from "../../../components/head/Head";
import SiteInfo from "../../../data/siteInfo";
import SitePath from "../../../data/sitePath";

export default function NewPasswordScreen() {
  const location = useLocation<{ email?: string }>();
  const navigate = useNavigate();
  const [newPasswordVal, setNewPasswordVal] = createSignal("");
  const [confirmPasswordVal, setConfirmPasswordVal] = createSignal("");
  const [newPasswordFieldError, setNewPasswordFieldError] =
    createSignal<string>();
  const [confirmPasswordFieldError, setConfirmPasswordFieldError] =
    createSignal<string>();

  createRenderEffect(() => {
    if (!location.state?.email) {
      navigate(SitePath.signinHref, { replace: true });
    }
  });

  function changePassword(
    e: Event & {
      submitter: HTMLElement;
    } & {
      currentTarget: HTMLFormElement;
      target: Element;
    }
  ) {
    e.preventDefault();

    const [newPassword, confirmPassword] = [
      newPasswordVal(),
      confirmPasswordVal(),
    ];
    const formValidity = testFormValidity(newPassword, confirmPassword);
    if (formValidity.newPassword)
      setNewPasswordFieldError(formValidity.newPassword);
    if (formValidity.confirmPassword)
      setConfirmPasswordFieldError(formValidity.confirmPassword);
    for (const f of Object.values(formValidity)) if (f) return;

    navigate(SitePath.resetPasswordSuccessHref, { replace: true });
  }

  function changeNewPassword(newPassword: string) {
    if (newPasswordFieldError()) setNewPasswordFieldError();
    setNewPasswordVal(newPassword);
  }

  function changeConfirmPassword(confirmPassword: string) {
    if (confirmPasswordFieldError()) setConfirmPasswordFieldError();
    setConfirmPasswordVal(confirmPassword);
  }

  return (
    <>
      <Head title="New password" />

      <div>
        <div class="w-fit mx-auto font-bold text-3xl">
          <span class="block text-center">Choose a new password</span>
        </div>
        <div class="w-fit mx-auto mt-2">
          <span class="block text-center">
            You'll be signed out of all active {SiteInfo.title} sessions after
            your password is changed
          </span>
        </div>

        <form class="mt-8" onsubmit={changePassword}>
          <div class="space-y-3">
            <div>
              <InputPassword
                labelText="NEW PASSWORD"
                labelClass="text-sm"
                inputName="new_password"
                inputValue={newPasswordVal()}
                inputOnInput={(e) => changeNewPassword(e.currentTarget.value)}
                inputRequired
                error={newPasswordFieldError()}
              />
            </div>
            <div>
              <InputPassword
                labelText="CONFIRM PASSWORD"
                labelClass="text-sm"
                inputName="confirm_password"
                inputValue={confirmPasswordVal()}
                inputOnInput={(e) =>
                  changeConfirmPassword(e.currentTarget.value)
                }
                inputRequired
                error={confirmPasswordFieldError()}
              />
            </div>
          </div>
          <div class="mt-4">
            <ConfirmButton type="submit">Change password</ConfirmButton>
          </div>
        </form>
      </div>
    </>
  );
}

function testFormValidity(newPassword?: string, confirmPassword?: string) {
  const newPasswordValidity = (() => {
    if (newPassword) {
      if (newPassword.length < 8) {
        return "Password must be longer than 8 characters";
      }
    } else {
      return "Password is required";
    }
  })();
  const confirmPasswordValidity = (() => {
    if (confirmPassword) {
      if (confirmPassword !== newPassword) {
        return "Password do not match";
      }
    } else {
      return "Password is required";
    }
  })();

  return {
    newPassword: newPasswordValidity,
    confirmPassword: confirmPasswordValidity,
  };
}
