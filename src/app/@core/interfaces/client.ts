import { KeyValuePair } from './keyValuePair';

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  pin?: string;
  cases: KeyValuePair[];
}
