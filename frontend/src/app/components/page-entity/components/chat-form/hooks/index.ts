import { useActionState, useTransition } from "react";
import { createMessageMutation } from "../actions/create-message-mutation";

export function useHooks() {
  const [state, formAction] = useActionState(createMessageMutation, {
    error: null,
  });
  const [isPending, startTransition] = useTransition();
  const submitAction = (formData: FormData) => {
    startTransition(() => {
      formAction(formData);
    });
  };

  return { error: state.error, isPending, submitAction };
}
