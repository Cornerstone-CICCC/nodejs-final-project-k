import { useEffect } from "react";
import { setCookie } from "./actions/set-cookie";

export function useHooks() {
  useEffect(() => {
    (async () => {
      await setCookie();
    })();
  }, []);
}
