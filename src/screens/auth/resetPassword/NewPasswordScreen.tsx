import { useLocation, useNavigate } from "@solidjs/router";
import { createRenderEffect, createSignal } from "solid-js";
import PrimaryButton from "../../../components/button/PrimaryButton";
import InputPassword from "../../../components/form/InputPassword";
import Head from "../../../components/head/Head";
import SiteInfo from "../../../data/siteInfo";
import SitePath from "../../../data/sitePath";
import useAuth from "../../../hooks/useAuth";
import showGqlError from "../../../utils/showGqlError";

export default function NewPasswordScreen() {
  const location = useLocation<{ email?: string; code?: string }>();
  const navigate = useNavigate();
  const { resetPassword: useResetPassword } = useAuth();
  const [newPasswordVal, setNewPasswordVal] = createSignal("");
  const [confirmPasswordVal, setConfirmPasswordVal] = createSignal("");
  const [newPasswordFieldError, setNewPasswordFieldError] =
    createSignal<string>();
  const [confirmPasswordFieldError, setConfirmPasswordFieldError] =
    createSignal<string>();
  const [isLoadingResetPassword, setIsLoadingResetPassword] =
    createSignal(false);

  createRenderEffect(() => {
    if (!location.state?.email || !location.state.code) {
      navigate(SitePath.signInHref, { replace: true });
    }
  });

  async function changePassword(
    e: MouseEvent & {
      currentTarget: HTMLDivElement;
      target: Element;
    }
  ) {
    e.preventDefault();

    if (isLoadingResetPassword()) return;

    const [newPassword, confirmPassword] = [
      newPasswordVal(),
      confirmPasswordVal(),
    ];

    // Validate form
    const formValidity = testFormValidity(newPassword, confirmPassword);
    if (formValidity.newPassword)
      setNewPasswordFieldError(formValidity.newPassword);
    if (formValidity.confirmPassword)
      setConfirmPasswordFieldError(formValidity.confirmPassword);
    for (const f of Object.values(formValidity)) if (f) return;

    try {
      setIsLoadingResetPassword(true);

      await useResetPassword(
        location.state?.email!,
        location.state?.code!,
        newPassword
      );

      navigate(SitePath.signInHref, { replace: true });
    } catch (e) {
      showGqlError(e);
    } finally {
      setIsLoadingResetPassword(false);
    }

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
          <span class="block text-center opacity-80">
            You'll be signed out of all active {SiteInfo.title} sessions after
            your password is changed
          </span>
        </div>

        <div role="form" class="mt-8">
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
            <PrimaryButton
              onclick={changePassword}
              isLoading={isLoadingResetPassword()}
              class="py-2 px-2"
            >
              Change password
            </PrimaryButton>
          </div>
        </div>
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
