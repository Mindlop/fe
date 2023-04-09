import { Outlet } from "@solidjs/router";
import SiteInfo from "../../data/siteInfo";

export default function AuthWrapper() {
  return (
    <div class="p-4">
      <div class="w-fit mx-auto mb-8">
        <span class="font-quicksand text-2xl">{SiteInfo.title}</span>
      </div>

      <Outlet />
    </div>
  );
}
