import { Outlet, useNavigate } from "@solidjs/router";
import { createRenderEffect, onCleanup } from "solid-js";
import SiteInfo from "../../data/siteInfo";
import SitePath from "../../data/sitePath";
import useAuth from "../../hooks/useAuth";

export default function AuthWrapper() {
  const navigate = useNavigate();
  const { validateToken } = useAuth();

  createRenderEffect(async () => {
    try {
      const isTokenValid = await validateToken();
      if (!isTokenValid) {
        return;
      }
    } catch {
      return;
    }

    navigate(SitePath.appHref, { replace: true });
  });

  createRenderEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "f") {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", callback);
    onCleanup(() => window.removeEventListener("keydown", callback));
  });

  createRenderEffect(() => {
    const callback = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.oncontextmenu = callback;
    onCleanup(() => {
      document.oncontextmenu = null;
    });
  });

  return (
    <div class="p-4 select-none">
      <div class="w-fit mx-auto mb-8">
        <span class="font-quicksand text-2xl">{SiteInfo.title}</span>
      </div>

      <Outlet />
    </div>
  );
}
