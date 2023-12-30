import { Player } from "./player";
import { PlayerStateDetail } from "./playerStateDetail";

export interface PlayerStatistic {
    playerStatisticId?: number;
    innings?: number;
    runs?: number;
    balls?: number;
    average?: number;
    fifty?: number;
    hundred?: number;
    sixs?: number;
    fours?: number;
    highest?: number;
    ducks?: number;
    wicket?: number;
    maidens?: number;
    economy?: number;
    playerId?: number;
    player?: Player;
    PlayerStateDetail?: PlayerStateDetail[]
}