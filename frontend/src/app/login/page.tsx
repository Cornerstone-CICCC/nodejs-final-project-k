import { Heading, VStack } from "@chakra-ui/react";
import { LoginForm } from "./components/login-form";

export default function Page() {
  return (
    <VStack p="44px" gap="24px" h="100dvh" justifyContent="center">
      <Heading>Login</Heading>
      <LoginForm />
    </VStack>
  );
}
