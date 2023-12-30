import { Coach } from "./coach";

export interface CoachSpecializaton {
    coachSpecializatoinIdId?: number;
    specializedIn?: string;
    coachId?: number;
    coach?: Coach[];
}
