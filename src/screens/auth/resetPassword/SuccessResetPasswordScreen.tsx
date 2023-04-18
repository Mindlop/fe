import { useNavigate } from "@solidjs/router";
import { onCleanup, onMount } from "solid-js";
import Head from "../../../components/head/Head";
import SiteInfo from "../../../data/siteInfo";
import SitePath from "../../../data/sitePath";

export default function SuccessResetPasswordScreen() {
  const navigate = useNavigate();

  onMount(() => {
    const timeout = setTimeout(
      () => navigate(SitePath.signinHref, { replace: true }),
      4000
    );

    onCleanup(() => clearTimeout(timeout));
  });

  return (
    <>
      <Head title="Reset password success" />

      <div>
        <div class="w-fit mx-auto font-bold text-3xl">
          <span class="block text-center">Password changed</span>
        </div>
        <div class="w-fit mx-auto mt-2">
          <span class="block text-center opacity-80">
            You have been signed out of all active {SiteInfo.title} sessions.
            You will be redirected to the sign-in page shortly.
          </span>
        </div>
      </div>
    </>
  );
}
