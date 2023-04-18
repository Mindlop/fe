export default function printError(e: any) {
  if (import.meta.env.DEV) {
    console.error(e);
  }
}
