import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('credit-card', 'Integration | Component | credit card', {
  integration: true,
  beforeEach: function(){
    this.setProperties({
      "today": new Date(),
      "card": Ember.Object.create({
        type: "Visa",
        accountNumber: 1234567890123456,
        name: "Jeremy Smith",
        expirationMonth: "6",
        expirationYear: "2016"
      })
    });
  }
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.render(hbs`{{credit-card card=card}}`);
  assert.equal(this.$('.credit-card .expiration-date').text().trim(), 'Expires: 6/2016');
});

test('it computes expiration for two years ago', function(assert){
  this.setProperties({
    'card.expirationYear': this.get("today").getFullYear() - 2
  });
  this.render(hbs`{{credit-card card=card today=today}}`);
  assert.ok(this.$('.credit-card').hasClass("is-expired"), 'assert two years ago is calculated as expired');
});

test('it computes expiration for a later month of last year', function(assert){
  let newMonth = 5;
  let lastYear = this.get('today').getFullYear() - 1;
  this.get("today").setMonth(newMonth);

  this.setProperties({
    'card.expirationMonth': (newMonth + 2).toString(),
    'card.expirationYear': lastYear
  });

  this.render(hbs`{{credit-card card=card today=today}}`);
  assert.ok(this.$('.credit-card').hasClass("is-expired"), 'assert last year is calculated as expired');
});

test('it computes expiration for previous month in current year', function(assert){
  let newMonth = 5;
  this.get("today").setMonth(newMonth);

  this.setProperties({
    'card.expirationMonth': newMonth - 1,
  });

  this.render(hbs`{{credit-card card=card today=today}}`);
  assert.ok(this.$('.credit-card').hasClass("is-expired"), 'assert past month in current year is calculated as expired');
});

test('it computes valid for current month', function(assert){
  let newMonth = 5;
  this.get("today").setMonth(newMonth);

  this.setProperties({
    'card.expirationMonth': (newMonth + 1).toString(),
  });

  this.render(hbs`{{credit-card card=card today=today}}`);
  assert.ok(this.$('.credit-card').hasClass("is-expired"), 'assert current month of current year is valid');
});

test('it computes valid for future month in current year', function(assert){
  let newMonth = 5;
  let thisYear = this.get("today").getFullYear();
  this.get("today").setMonth(newMonth);

  this.setProperties({
    'card.expirationMonth': (newMonth + 2).toString(),
    'card.expirationYear': thisYear
  });

  this.render(hbs`{{credit-card card=card today=today}}`);
  assert.notOk(this.$('.credit-card').hasClass("is-expired"), 'assert future month in current year is NOT calculated as expired');
});

test('it computes valid for next year', function(assert){
  let nextYear = this.get("today").getFullYear() + 1;
  this.setProperties({
    'card.expirationYear': nextYear
  });
  this.render(hbs`{{credit-card card=card today=today}}`);
  assert.notOk(this.$('.credit-card').hasClass("is-expired"), 'assert next year is NOT calculated as expired');
});

test('it applies green border to expired cards', function(assert){
  let futureYear = this.get("today").getFullYear() + 1;
  this.set("card.expirationYear", futureYear);

  this.render(hbs`{{credit-card card=card today=today}}`);
  assert.equal(this.$('.credit-card').css("borderColor"), 'rgb(0, 128, 0)');
});

test('it applies red border to expired cards', function(assert){
  let previousYear = this.get("today").getFullYear() - 1;
  this.set("card.expirationYear", previousYear);
  this.render(hbs`{{credit-card card=card today=today}}`);
  assert.equal(this.$('.credit-card.is-expired').css("borderColor"), 'rgb(255, 0, 0)');
});