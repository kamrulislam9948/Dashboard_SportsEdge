import { Coach } from "./coach";
import { MedicalAdvisor } from "./medicaladvisor";
import { Event } from "./event";

export interface SelectionPanel {
    selectionPanelId?: number;
    selectorName?: string;
    coachId?: number;
    coach?: Coach;
    medicalAdvisorId?: number;
    medicalAdvisor?: MedicalAdvisor;
    events? : Event;
}
