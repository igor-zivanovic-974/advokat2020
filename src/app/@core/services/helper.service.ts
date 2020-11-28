import { Injectable } from '@angular/core';
import { Role } from '../interfaces/role';

@Injectable()
export class HelperService {
  getEmployees() {
    const employees = [
      { id: 1, firstName: 'John', lastName: 'Doe', roleId: 1, role: 'operator' },
      { id: 2, firstName: 'Jason', lastName: 'Smith', roleId: 3, role: 'client' },
      { id: 3, firstName: 'Michael', lastName: 'Douglas', roleId: 2, role: 'owner' },
    ];
    return employees;
  }

  getCases() {
    const cases = [
      { id: 1, name: 'Case1', description: 'About case 1', courtId: 1, court: '', active: true },
      { id: 2, name: 'Case2', description: 'About case 2', courtId: 1, court: '', active: true },
      { id: 3, name: 'Case3', description: 'About case 3', courtId: 1, court: '', active: true },
    ];
    return cases;
  }

  getClients() {
    const clients = [
      {
        id: 1,
        firstName: 'Case1',
        lastName: 'Surname 1',
        address: 'Some address 1',
        phone: '1234567898',
        pin: '9876543210',
      },
      {
        id: 2,
        firstName: 'Case2',
        lastName: 'Surname 2',
        address: 'Some address 2',
        phone: '1234567898',
        pin: '9876543210',
      },
      {
        id: 3,
        firstName: 'Case3',
        lastName: 'Surname 3',
        address: 'Some address 3',
        phone: '1234567898',
        pin: '9876543210',
      },
    ];
    return clients;
  }

  getCourts() {
    const courts = [
      { id: 1, name: 'Prvi osnovni sud', active: true },
      { id: 2, name: 'Drugi osnovni sud', active: true },
      { id: 3, name: 'Treci osnovni sud', active: true },
    ];
    return courts;
  }

  getCourt(id: number) {
    if (id === 1) {
      return 'Prvi osnovni sud';
    }
    if (id === 2) {
      return 'Drugi osnovni sud';
    }
    if (id === 3) {
      return 'Treci osnovni sud';
    }
  }

  getRoles() {
    const roles: Role[] = [
      { id: 1, roleName: 'operator' },
      { id: 2, roleName: 'owner' },
      { id: 3, roleName: 'client' },
    ];
    return roles;
  }

  getRole(id: number) {
    if (id === 1) {
      return 'operator';
    }
    if (id === 2) {
      return 'owner';
    }
    if (id === 3) {
      return 'client';
    }
  }

  getMonth(month: any) {
    if (month === 0) {
      return 'January';
    }
    if (month === 1) {
      return 'February';
    }
    if (month === 2) {
      return 'March';
    }
    if (month === 3) {
      return 'April';
    }
    if (month === 4) {
      return 'May';
    }
    if (month === 5) {
      return 'June';
    }
    if (month === 6) {
      return 'July';
    }
    if (month === 7) {
      return 'August';
    }
    if (month === 8) {
      return 'September';
    }
    if (month === 9) {
      return 'October';
    }
    if (month === 10) {
      return 'November';
    }
    if (month === 11) {
      return 'December';
    }
  }

  getDayOfWeek(day: any) {
    if (day === 0) {
      return 'Monday';
    }
    if (day === 1) {
      return 'Tuesday';
    }
    if (day === 2) {
      return 'Wednesday';
    }
    if (day === 3) {
      return 'Thursday';
    }
    if (day === 4) {
      return 'Friday';
    }
    if (day === 5) {
      return 'Saturday';
    }
    if (day === 6) {
      return 'Sunday';
    }
  }
}
