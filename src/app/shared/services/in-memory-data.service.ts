import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      {
        id: 1,
        email: 'admin@tourismapp.com',
        name: 'admin',
        password: 'password1234',
        isAdmin: true,
        activitiesEnrolled: [1, 2, 3, 4],
        languages: [],
        education: [],
      },
      {
        id: 2,
        email: 'sonia@yahoo.com',
        name: 'sonia',
        password: 'password1234',
        isAdmin: false,
        activitiesEnrolled: [2, 4],
        education: [
          {
            id: '1',
            type: 'grado',
            level: 'doctorado',
            name: 'Doctorado en Ciencias De la Salud',
            university: 'Universidad de Medellín',
            finishDate: '02/07/1998',
          },
          {
            id: '2',
            type: 'ciclo formativo',
            level: 'grado medio',
            name: 'Ciclo Formativo en Atención Sanitaria',
            university: 'Centro de estudios La Salva',
            finishDate: '05/06/1986',
          },
        ],
        languages: [
          {
            id: 1,
            level: 'A1',
            language: 'francés',
            finishDate: '08/12/2018',
          },
          {
            id: 2,
            level: 'B2',
            language: 'inglés',
            finishDate: '08/12/2018',
          },
        ],
      },
      {
        id: 3,
        email: 'enzo@gmail.com',
        name: 'enzo',
        password: 'password1234',
        isAdmin: false,
        activitiesEnrolled: [],
      },
    ];
    const activities = [
      {
        id: 1,
        name: 'Segway Tour Around City Center',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        language: 'ES',
        date: '20/11/2020',
        minEnrolled: 10,
        maxEnrolled: 20,
        usersEnrolled: 1,
        category: 'Patrimonio',
        subcategory: 'Visita Guiada',
        price: 20,
      },
      {
        id: 2,
        name: 'Jetsky Trip To Peñíscola',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        language: 'ES',
        date: '20/11/2020',
        minEnrolled: 4,
        maxEnrolled: 10,
        usersEnrolled: 2,
        category: 'Playas',
        subcategory: 'Actividad Nautica',
        price: 70,
      },
      {
        id: 3,
        name: 'Wine Tasting At Bodega Bocopa',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        language: 'ES',
        date: '20/11/2020',
        minEnrolled: 10,
        maxEnrolled: 20,
        usersEnrolled: 1,
        category: 'Enoturismo',
        subcategory: 'Bodega',
        price: 17,
      },
      {
        id: 4,
        name: 'Albufera Tour',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        language: 'EN',
        date: '20/11/2020',
        minEnrolled: 8,
        maxEnrolled: 20,
        usersEnrolled: 2,
        category: 'Patrimonio',
        subcategory: 'Excursion',
        price: 5,
      },
    ];
    return { users, activities };
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
  }
}
