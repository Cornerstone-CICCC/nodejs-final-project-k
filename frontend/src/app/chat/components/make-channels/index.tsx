"use client";
import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useHooks } from "./hooks";

export function MakeChannels() {
  const { openModal, closeModal, isOpen, isPending, createChannel, nameRef } =
    useHooks();
  return (
    <>
      <Box position="fixed" bottom={0}>
        <Button onClick={openModal}>Make a new channel</Button>
      </Box>
      <Modal isOpen={isOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Make a Chat?</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={createChannel}>
            <fieldset disabled={isPending}>
              <ModalBody>
                <Input ref={nameRef} />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} isLoading={isPending}>
                  Submit
                </Button>
              </ModalFooter>
            </fieldset>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
