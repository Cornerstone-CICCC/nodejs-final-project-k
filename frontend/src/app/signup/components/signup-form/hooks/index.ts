import { useTransition } from "react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { createUser } from "./actions/create-user";

export function useHooks() {
  const toast = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const submitAction = (formData: FormData) => {
    startTransition(async () => {
      try {
        await createUser(formData);
        router.push("/login");
      } catch (error) {
        toast({ description: JSON.stringify(error), status: "error" });
      }
    });
  };

  return { isPending, submitAction };
}
