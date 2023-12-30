import { CoachSports } from "./coachSport";
import { PlayerSport } from "./playerSport";

export interface Sport {
    sportId?: number;
    sportsName?: string;
    coachSport?: CoachSports[]
    playerSport?: PlayerSport[]
}
