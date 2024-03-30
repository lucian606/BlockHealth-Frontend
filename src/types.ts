export interface Diagnosis {
    diagnosisDetails: string;
    location: string;
    medicId: string;
    specialty: string;
    timestamp: string;
}

export interface WhitelistItem {
    displayName: string;
    email: string;
    specialty: string;
    uid: string;
}

export type RequestItem = WhitelistItem;