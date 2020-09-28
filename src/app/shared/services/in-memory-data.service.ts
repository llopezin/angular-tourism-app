import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService {
  createDb() {
    const users = [
      {
        id: 1,
        email: 'admin@tourismapp.com',
        name: 'Admin',
        password: '2s79N92',
        isAdmin: true,
        activitiesEnrolled: [],
      },
      {
        id: 2,
        email: 'sonia@yahoo.com',
        name: 'testUser',
        password: 'pass1234',
        isAdmin: false,
        activitiesEnrolled: [],
      },
    ];
    return { users };
  }

  /*   genId(users: user[]): number {
    return users.length > 0 ? Math.max(...users.map(hero => hero.id)) + 1 : 1;
  } */
}
