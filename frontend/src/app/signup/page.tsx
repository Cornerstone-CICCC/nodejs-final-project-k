import { Heading, VStack } from "@chakra-ui/react";
import { SignupForm } from "./components/signup-form";

export default function Page() {
  return (
    <VStack p="44px" gap="24px" h="100dvh" justifyContent="center">
      <Heading>Signup</Heading>
      <SignupForm />
    </VStack>
  );
}
