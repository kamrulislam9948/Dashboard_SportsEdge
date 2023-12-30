import { TrainingSession } from "./trainingSession";

export interface Equipment{
    equipmentId?: number;
    equipmentName?: string;
    picture?: string;
    trainingSessionId?: number;
    trainingSession?: TrainingSession;   
}