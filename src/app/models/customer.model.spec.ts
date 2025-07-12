import { Customer } from './customer.model';

describe('Customer Model', () => {

  fit('frontend_customer model should create an instance', () => {
    // Create a sample user object
    const customer: Customer = { };

    expect(customer).toBeTruthy();
  });
});
