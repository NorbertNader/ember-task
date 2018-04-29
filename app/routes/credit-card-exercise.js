import Ember from 'ember';

let currentYear = new Date().getFullYear();

export default Ember.Route.extend({
  model: function() {
    return [
      Ember.Object.create({
        type: "Visa",
        accountNumber: 1234567890123456,
        name: "Jeremy Smith",
        expirationMonth: "12",
        expirationYear: currentYear
      }),
      Ember.Object.create({
        type: "Mastercard",
        accountNumber: 8741567890123456,
        name: "Jeremy Smith",
        expirationMonth: "5",
        expirationYear: currentYear + 1
      }),
      Ember.Object.create({
        type: "Visa",
        accountNumber: 5457567890123456,
        name: "Jeremy Smith",
        expirationMonth: "1",
        expirationYear: currentYear
      }),
      Ember.Object.create({
        type: "Discover",
        accountNumber: 8123567890123456,
        name: "Jeremy Smith",
        expirationMonth: "12",
        expirationYear: currentYear - 1
      })
    ];
  }
});