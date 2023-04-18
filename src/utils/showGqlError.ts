import toast from "solid-toast";
import parseError from "./parseError";
import printError from "./printError";

export default function showGqlError(e: any) {
  const err = parseError(e);
  printError(e);
  toast.error(err);
}
