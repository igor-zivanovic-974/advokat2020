import { Evidence } from '@app/@core/interfaces/evidence';
import { Action } from '@ngrx/store';

export const ADD_EVIDENCE = 'ADD_EVIDENCE';

export class AddEvidence implements Action {
    readonly type = ADD_EVIDENCE;
    payload: Evidence;
}