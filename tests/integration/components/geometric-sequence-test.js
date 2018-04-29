import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('geometric-sequence', 'Integration | Component | geometric sequence', {
  integration: true
});

test('it reaches 1024', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{geometric-sequence}}`);

  this.$('.geometric-sequence-update-button').click(); //8
  this.$('.geometric-sequence-update-button').click(); //16
  this.$('.geometric-sequence-update-button').click(); //32
  this.$('.geometric-sequence-update-button').click(); //64
  this.$('.geometric-sequence-update-button').click(); //128
  this.$('.geometric-sequence-update-button').click(); //256
  this.$('.geometric-sequence-update-button').click(); //512
  assert.equal(this.$('.geometric-sequence li').text().trim(), '512 256 128 64 32 16 8 4 2 1', 'assert geometric sequence adds numbers correctly');

});


test('it removes smallest number after 10 items', function(assert) {

  this.render(hbs`{{geometric-sequence}}`);

  this.$('.geometric-sequence-update-button').click(); //8
  this.$('.geometric-sequence-update-button').click(); //16
  this.$('.geometric-sequence-update-button').click(); //32
  this.$('.geometric-sequence-update-button').click(); //64
  this.$('.geometric-sequence-update-button').click(); //128
  this.$('.geometric-sequence-update-button').click(); //256
  this.$('.geometric-sequence-update-button').click(); //512
  this.$('.geometric-sequence-update-button').click(); //1024
  this.$('.geometric-sequence-update-button').click(); //2048
  this.$('.geometric-sequence-update-button').click(); //4096

  assert.equal(this.$('.geometric-sequence li').text().trim(), '4096 2048 1024 512 256 128 64 32 16 8');

});

test('it resets after 2^15', function(assert) {
  this.render(hbs`{{geometric-sequence}}`);

  this.$('.geometric-sequence-update-button').click(); //8
  this.$('.geometric-sequence-update-button').click(); //16
  this.$('.geometric-sequence-update-button').click(); //32
  this.$('.geometric-sequence-update-button').click(); //64
  this.$('.geometric-sequence-update-button').click(); //128
  this.$('.geometric-sequence-update-button').click(); //256
  this.$('.geometric-sequence-update-button').click(); //512
  this.$('.geometric-sequence-update-button').click(); //1024
  this.$('.geometric-sequence-update-button').click(); //2048
  this.$('.geometric-sequence-update-button').click(); //4096
  this.$('.geometric-sequence-update-button').click(); //2^13
  this.$('.geometric-sequence-update-button').click(); //2^14
  this.$('.geometric-sequence-update-button').click(); //2^15
  this.$('.geometric-sequence-update-button').click(); //RESET

  assert.equal(this.$('.geometric-sequence li').text().trim(), '4 2 1', 'assert the array resets when trying to add a number > 2^15');

});