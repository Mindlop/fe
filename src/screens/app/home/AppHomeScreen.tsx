import Head from "../../../components/head/Head";
import Link from "../../../components/link/Link";
import SitePath from "../../../data/sitePath";

export default function AppHomeScreen() {
  return (
    <>
      <Head title="Home" />
      <div>AppHomeScreen</div>
      <Link href={SitePath.circlesFull}>{SitePath.circlesFull}</Link>
    </>
  );
}
