import { Cart } from './cart.model';

describe('Cart Model', () => {

  fit('frontend_cart model should create an instance', () => {
    // Create a sample user object
    const cart: Cart = {
      totalAmount:100
    };

    expect(cart).toBeTruthy();
    expect(cart.totalAmount).toBe(100);

  });
});
