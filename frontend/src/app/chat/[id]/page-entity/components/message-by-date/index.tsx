"use client";

import {
  Box,
  Flex,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Divider,
  HStack,
  Textarea,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useHooks } from "./hooks/hooks";
import dayjs from "dayjs";
import { MessagesByDate } from "@/app/types/messagesByDate";

export function MessageByDate({
  userName,
  created_at,
  text,
  id,
}: MessagesByDate[][number]["messages"][number]) {
  const {
    showActions,
    closeActions,
    hasActions,
    startToEditMessage,
    messageIdToBeUpdated,
    cancelEditingMessage,
    messageRef,
    updateMessage,
    isPending,
    openModalToConfirmDeleteMessage,
    messageIdToBeDeleted,
    closeModalToConfirmDeleteMessage,
    deleteMessage,
  } = useHooks();

  return (
    <>
      <Box position="relative">
        <Box
          {...(messageIdToBeUpdated === id
            ? {}
            : {
                onMouseEnter: showActions,
                onMouseLeave: closeActions,
                cursor: "pointer",
              })}
          px="16px"
          pb="16px"
        >
          <Flex gap="8px">
            <Text fontWeight={700}>{userName}</Text>
            {/* TODO: make time fixed using position: sticky or fixed */}
            <time dateTime={dayjs(created_at).format("HH:mm")}>
              {dayjs(created_at).format("HH:mm")}
            </time>
          </Flex>
          {id === messageIdToBeUpdated ? (
            <form onSubmit={updateMessage}>
              <fieldset disabled={isPending}>
                <HStack gap="12px">
                  <Textarea defaultValue={text} ref={messageRef} />
                  <Button type="submit" isLoading={isPending}>
                    Update
                  </Button>
                  <Button isDisabled={isPending} onClick={cancelEditingMessage}>
                    Cancel
                  </Button>
                </HStack>
              </fieldset>
            </form>
          ) : (
            <Text>{text}</Text>
          )}
        </Box>
        <Divider />
        {hasActions ? (
          <Box
            onMouseEnter={showActions}
            onMouseLeave={closeActions}
            position="absolute"
            right={0}
            top="16px"
          >
            <Menu>
              <MenuButton as={Button}>Actions</MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    startToEditMessage(id);
                  }}
                >
                  Edit
                </MenuItem>
                <MenuItem onClick={() => openModalToConfirmDeleteMessage(id)}>
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        ) : null}
      </Box>
      <Modal
        isOpen={messageIdToBeDeleted !== undefined}
        onClose={closeModalToConfirmDeleteMessage}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete the message</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            You can&apos;t undo this action. Are you sure you want to delete the
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={closeModalToConfirmDeleteMessage}
              colorScheme="blue"
              mr={3}
            >
              Cancel
            </Button>
            <Button onClick={deleteMessage} colorScheme="red">
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
