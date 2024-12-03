export type MessagesByDate = {
  id: number;
  created_at: string;
  messages: {
    id: number;
    text: string;
    created_at: string;
    userId: number;
    dateMessageId: number;
  }[];
};