import { TrainingSession } from "./trainingSession";

export interface Attendence{
    attendenceId?: number;
    isPresent?: boolean;
    Date?: Date| string;
    trainingSessionId?: number;
    trainingSession?: TrainingSession;
}