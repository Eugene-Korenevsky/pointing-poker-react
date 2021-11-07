import { GameSettings } from "../components/wrapperPage/lobby/settingsBlock/settingBlog.slice";
import { Issue } from "./Issue";
import { User } from "./User";

export interface Room {
  roomID: string;
  name: string;
  state: GameState;
  issues: Issue[];
  gameSettings: GameSettings;
  members: User[];
}

export enum GameState {
  WAITING = 'WAITING',
  PLAYING = 'PLAYING',
  RESULT = 'RESULT',
  NONE = '',
}