import { CoachTeams } from "./coachTeams";
import { Player } from "./player";
import { Sport } from "./sport";

export interface Team {
    teamId?: number;
    teamName?: string;
    captain?: string | Date;
    teamLogo?: string;
    sportId?: number;
    sport?: Sport;
    coachTema?: CoachTeams[]
    players?: Player[]
}
