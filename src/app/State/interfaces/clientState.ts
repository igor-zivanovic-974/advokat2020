import { Client } from '@app/@core/interfaces/client';

export interface ClientState {
    currentEmployee: Client,
    employees: Client[];
} 