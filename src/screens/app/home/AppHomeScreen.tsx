import Head from "../../../components/head/Head";
import useAuth from "../../../hooks/useAuth";

export default function AppHomeScreen() {
  const auth = useAuth();

  return (
    <>
      <Head title="Home" />
      <div>AppHomeScreen</div>
      <div onclick={auth.signOut}>SignOut</div>
    </>
  );
}
