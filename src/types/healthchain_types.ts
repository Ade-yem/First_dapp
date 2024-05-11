export type Medication = {
    name: string;
    dosage: string;
};

export type MedicalRecord = {
    id: number;
    patientName: string;
    diagnosis: string;
    medications: Medication[];
    doctor: string;
    date: string;
    walletAddress: string;
};

export type Doctor = {
    id: string;
    name: string;
    walletAddress: string;
    specialization: string;
    hospitalAffiliation: string;
    whitelisted: boolean;
};

export type Hospital = {
    id: string;
    name: string;
    walletAddress: string;
    whitelisted: boolean;
    whitelist: string[];
};

export type Patient = {
    id: string;
    name: string;
    walletAddress: string;
    whitelist: string[];
};