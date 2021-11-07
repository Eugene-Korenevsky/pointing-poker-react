import { GameSettings } from "../components/wrapperPage/lobby/settingsBlock/settingBlog.slice";
import { Issue } from "./Issue";
import { User } from "./User";

export interface Game {
  members: User[]
  issues: Issue[]
  gameSettings: GameSettings;
  gameStatus: GameStatus;
}

export enum GameStatus {
  WAITING = 'WAITING',
  PLAYING = 'PLAYING',
  RESULT = 'RESULT'
}