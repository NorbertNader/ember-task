import Ember from 'ember';

export default Ember.Component.extend({

  setCurrentDate: Ember.on('init', function(){
    let date = new Date();
    //override `today` property for integration tests
    if (!this.get("today")) {

      this.set('today', date.getTime());
    }
  }),

  today: null,
  card: null,
  classNames: ['credit-card', 'text-left'],

  //binds class name of 'is-expire' when the `isExpired` property is true.
  classNameBindings: ["isExpired:is-expired"],

  //returns true if `card` is expired, otherwise returns false.
  isExpired: Ember.computed("card.expirationMonth", "card.expirationYear", function() {
    let card = this.get("card");
    let today = this.get("today");
    let expiresOn = new Date(card.expirationYear, card.expirationMonth).getTime();

    if (expiresOn < today) return true;

    return false;
  })
/*

  exampleCard: {
    type: "Visa",
    accountNumber: 1234567890123456,
    name: "Jeremy Smith",
    expirationMonth: "12",
    expirationYear: "2016"
  },

*/
});
