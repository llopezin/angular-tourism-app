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
        password: '2s79N92',
        isAdmin: true,
        activitiesEnrolled: [],
      },
      {
        id: 2,
        email: 'sonia@yahoo.com',
        name: 'sonia',
        password: 'password1234',
        isAdmin: false,
        activitiesEnrolled: [],
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
        name: 'segway tour around city center',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis dui eget convallis efficitur. Pellentesque ornare augue sit amet est condimentum egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce in blandit turpis. Duis nulla quam, eleifend quis rutrum eget, rutrum non lectus. Sed cursus nunc in nunc accumsan, nec molestie metus semper. Mauris mattis semper magna eu facilisis. Etiam finibus ut arcu quis pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        language: 'ES',
        date: '20/11/2020',
        minEnrolled: 10,
        maxEnrolled: 20,
        usersEnrolled: 0,
        category: 'culture',
        subcategory: 'walks',
        price: 20,
      },
      {
        id: 2,
        name: 'Jetsky trip to Peñíscola',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis dui eget convallis efficitur. Pellentesque ornare augue sit amet est condimentum egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce in blandit turpis. Duis nulla quam, eleifend quis rutrum eget, rutrum non lectus. Sed cursus nunc in nunc accumsan, nec molestie metus semper. Mauris mattis semper magna eu facilisis. Etiam finibus ut arcu quis pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        language: 'ES',
        date: '20/11/2020',
        minEnrolled: 4,
        maxEnrolled: 10,
        usersEnrolled: 0,
        category: 'adventure',
        subcategory: 'acuatic',
        price: 70,
      },
      {
        id: 3,
        name: 'wine tasting at Bodega Bocopa',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis dui eget convallis efficitur. Pellentesque ornare augue sit amet est condimentum egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce in blandit turpis. Duis nulla quam, eleifend quis rutrum eget, rutrum non lectus. Sed cursus nunc in nunc accumsan, nec molestie metus semper. Mauris mattis semper magna eu facilisis. Etiam finibus ut arcu quis pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        language: 'ES',
        date: '20/11/2020',
        minEnrolled: 10,
        maxEnrolled: 20,
        usersEnrolled: 0,
        category: 'gastronomy',
        subcategory: 'wine',
        price: 17,
      },
      {
        id: 4,
        name: 'Albufera tour',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis dui eget convallis efficitur. Pellentesque ornare augue sit amet est condimentum egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce in blandit turpis. Duis nulla quam, eleifend quis rutrum eget, rutrum non lectus. Sed cursus nunc in nunc accumsan, nec molestie metus semper. Mauris mattis semper magna eu facilisis. Etiam finibus ut arcu quis pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        language: 'EN',
        date: '20/11/2020',
        minEnrolled: 8,
        maxEnrolled: 20,
        usersEnrolled: 0,
        category: 'culture',
        subcategory: 'walks',
        price: 5,
      },
    ];
    return { users, activities };
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
  }
}
