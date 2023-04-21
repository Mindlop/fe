import { A, Outlet, useLocation, useNavigate } from "@solidjs/router";
import { Show, createRenderEffect, createSignal, onCleanup } from "solid-js";
import SitePath from "../../data/sitePath";
import useAuth from "../../hooks/useAuth";
import IconHome from "../../components/icon/IconHome";
import IconPeopleCircle from "../../components/icon/IconPeopleCircle";
import IconAddCircle from "../../components/icon/IconAddCircle";
import IconChatboxEllipses from "../../components/icon/IconChatboxEllipses";
import IconNotifications from "../../components/icon/IconNotifications";
import useBottomSheet from "../../hooks/useBottomSheet";
import BottomSheet from "../../components/bottomSheet/BottomSheet";

enum BottomNavbar {
  Hidden,
  Home,
  Circle,
  Notifications,
  Messages,
}

export default function AppWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const bottomSheet = useBottomSheet();
  const [activeBottomNavbar, setActiveBottomNavbar] =
    createSignal<BottomNavbar>(BottomNavbar.Hidden);

  createRenderEffect(async () => {
    try {
      const isTokenValid = await auth.validateToken();
      if (isTokenValid) {
        return;
      }
    } catch {}

    navigate(SitePath.signinHref, { replace: true });
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

  createRenderEffect(() => {
    switch (location.pathname) {
      case SitePath.appHref: {
        setActiveBottomNavbar(BottomNavbar.Home);
        break;
      }
      case SitePath.circlesHref: {
        setActiveBottomNavbar(BottomNavbar.Circle);
        break;
      }
      case SitePath.notificationsHref: {
        setActiveBottomNavbar(BottomNavbar.Notifications);
        break;
      }
      case SitePath.messagesHref: {
        setActiveBottomNavbar(BottomNavbar.Messages);
        break;
      }
      default: {
        setActiveBottomNavbar(BottomNavbar.Hidden);
      }
    }
  });

  return (
    <div class="select-none">
      <div class="min-h-screen flex flex-col">
        <div class="flex-1 flex flex-col">
          <Outlet />
        </div>

        <Show when={activeBottomNavbar() !== BottomNavbar.Hidden}>
          <div class="p-2 flex justify-around border-t">
            <A href={SitePath.appHref}>
              <IconHome
                iconStyle={
                  activeBottomNavbar() === BottomNavbar.Home
                    ? "fill"
                    : "outline"
                }
                class="h-5 w-5"
              />
            </A>
            <A href={SitePath.circlesHref}>
              <IconPeopleCircle
                iconStyle={
                  activeBottomNavbar() === BottomNavbar.Circle
                    ? "fill"
                    : "outline"
                }
                class="h-5 w-5"
              />
            </A>
            <A href={SitePath.createPostHref}>
              <IconAddCircle iconStyle="outline" class="h-5 w-5" />
            </A>
            <A href={SitePath.notificationsHref}>
              <IconNotifications
                iconStyle={
                  activeBottomNavbar() === BottomNavbar.Notifications
                    ? "fill"
                    : "outline"
                }
                class="h-5 w-5"
              />
            </A>
            <A href={SitePath.messagesHref}>
              <IconChatboxEllipses
                iconStyle={
                  activeBottomNavbar() === BottomNavbar.Messages
                    ? "fill"
                    : "outline"
                }
                class="h-5 w-5"
              />
            </A>
          </div>
        </Show>
      </div>

      <div
        onclick={bottomSheet.remove}
        class="fixed top-0 right-0 bottom-0 left-0 min-w-screen min-h-screen bg-black/30"
        classList={{
          invisible: bottomSheet.count() === 0,
        }}
      >
        <BottomSheet />
      </div>
    </div>
  );
}
