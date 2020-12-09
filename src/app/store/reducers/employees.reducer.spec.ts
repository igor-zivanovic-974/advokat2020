import * as employeeActions from '../actions/employees.actions';
import { employeeReducer } from './employees.reducers';

describe('employeesReducer', () => {
    it('should delete employee', () => {
        const currState = [
            {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                address: 'Radoja Dakica 12, Zemun',
                phone: '063/ 331030',
                roleId: 1,
                role: {
                    id: 1,
                    name: 'Operator'
                },
                cases: [{}]
            },
            {
                id: 2,
                firstName: 'Doug',
                lastName: 'Christie',
                address: 'Park Avenue 22, Zemun',
                phone: '063/ 331050',
                roleId: 1,
                role: {
                    id: 1,
                    name: 'Operator'
                },
                cases: [{}]
            }
        ];

        const expectedResult = [
            {
                id: 2,
                firstName: 'Doug',
                lastName: 'Christie',
                address: 'Park Avenue 22, Zemun',
                phone: '063/ 331050',
                roleId: 1,
                role: {
                    id: 1,
                    name: 'Operator'
                },
                cases: [{}]
            }];

        const action = new employeeActions.DeleteEmployeeSuccessAction(1);
        const result = employeeReducer(currState, action);
        expect(result).toEqual(expectedResult);
    });
});