import { thread } from "./Thread";
import { User } from "./User";

export interface Notif {
  id: number;
  type: string;
  actor: User;
  createdAt: string;
  threadId: thread;
  content: string;
  action: string;
  image: string;
}
