import { Order } from './order.model';

describe('Order Model', () => {

  fit('frontend_order model should create an instance', () => {
    // Create a sample user object
    const order: Order = {
      quantity:2
    };

    expect(order).toBeTruthy();
    expect(order.quantity).toBe(2);

  });
});
