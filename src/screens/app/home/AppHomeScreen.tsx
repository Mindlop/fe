import Head from "../../../components/head/Head";
import useAuth from "../../../hooks/useAuth";

export default function AppHomeScreen() {
  const { signOut } = useAuth();

  return (
    <>
      <Head title="Home" />
      <div>AppHomeScreen</div>
      <button onclick={signOut}>SignOut</button>
    </>
  );
}
