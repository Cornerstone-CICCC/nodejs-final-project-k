import { useTransition } from "react";
import { login } from "@/app/login/components/login-form/hooks/actions/login";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export function useHooks() {
  const toast = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const submitAction = (formData: FormData) => {
    startTransition(async () => {
      try {
        await login(formData);
        router.push("/chat");
      } catch (error) {
        toast({ description: JSON.stringify(error), status: "error" });
      }
    });
  };

  return { isPending, submitAction };
}
