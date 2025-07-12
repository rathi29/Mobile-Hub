import { User } from './user.model';

describe('User Model', () => {

  fit('frontend_user model should create an instance', () => {
    // Create a sample user object
    const user: User = {
      email:'admin@gmail.com',
      password:'Admin@123',
    };

    expect(user).toBeTruthy();
    expect(user.email).toBe('admin@gmail.com');
    expect(user.password).toBe('Admin@123');

  });
});
