"use client";
import {
  Box,
  Button,
  Icon,
  IconButton,
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
import { IoMdAdd } from "react-icons/io";

export function MakeChannels() {
  const { openModal, closeModal, isOpen, isPending, createChannel, nameRef } =
    useHooks();
  return (
    <Box>
      <IconButton
        aria-label=""
        onClick={openModal}
        p={0}
        icon={<Icon as={IoMdAdd} />}
      />
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
    </Box>
  );
}
