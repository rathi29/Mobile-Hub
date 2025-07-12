import { Mobile } from './mobile.model';

describe('Mobile Model', () => {

  fit('frontend_mobile model should create an instance', () => {
    // Create a sample user object
    const mobile: Mobile = {
      price : 100
    };

    expect(mobile).toBeTruthy();
    expect(mobile.price).toBe(100);
  });
});
