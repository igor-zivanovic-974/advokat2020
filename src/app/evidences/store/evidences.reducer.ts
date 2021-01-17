import { Evidence } from '@core/interfaces/evidence';
import * as EvidencesActions from './evidences.actions';

const initialState = {
  evidences: [
    new Evidence(1, 'Ev-1', 1, new Date('2020/12/22')),
    // new Evidence(id: 1, name: 'Ev-1', caseId: 1, dateAdded: new Date('2020/12/22'),
    // new Evidence(id: 2, name: 'Ev-2', caseId: 2, dateAdded: new Date('2020/12/23')
  ],
};

// tslint:disable-next-line:typedef
export function evidencesReducer(state = initialState, action: EvidencesActions.AddEvidence) {
  switch (action.type) {
    case EvidencesActions.ADD_EVIDENCE:
      return {
        ...state,
        evidences: [...state.evidences, action.payload],
      };
  }
}
