import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('shrinking-box', 'Integration | Component | shrinking box', {
  integration: true
});

test('it renders large size and initial background by default', function(assert) {
  this.render(hbs`{{shrinking-box bigMessage="Big Message!" smallMessage="Small Message!"}}`);

  assert.equal(this.$('.shrinking-box')[0].offsetWidth, '360', 'assert width is 360px by default');
  assert.equal(this.$('.shrinking-box')[0].offsetHeight, '360', 'assert height is 360px by default');
  assert.equal(this.$('.shrinking-box').css("background-color"), "rgb(200, 200, 200)", 'assert color is rgb(12, 89, 100)');
});

test('it renders small size and appropriate background after clicking', function(assert) {
  this.render(hbs`{{shrinking-box bigMessage="Big Message!" smallMessage="Small Message!"}}`);

  this.$('.shrinking-box').click();

  assert.equal(this.$('.shrinking-box')[0].offsetWidth, '200', 'assert width is 200px');
  assert.equal(this.$('.shrinking-box')[0].offsetHeight, '200', 'assert height is 200px');
  assert.equal(this.$('.shrinking-box').css("background-color"), "rgb(12, 89, 100)", 'assert background color is rgb(12, 89, 100)');
  assert.equal(this.$('.shrinking-box').css("color"), "rgb(255, 255, 255)", 'assert color is rgb(255, 255, 255)');
});

test('it returns to full size after clicking the small box', function(assert) {
  this.render(hbs`{{shrinking-box bigMessage="Big Message!" smallMessage="Small Message!"}}`);

  this.$('.shrinking-box').click();

  assert.ok(this.$('.shrinking-box.is-small').length, 'assert is small after one click');

  this.$('.shrinking-box').click();

  assert.notOk(this.$('.shrinking-box.is-small').length, 'assert is small class not applied');
  assert.equal(this.$('.shrinking-box')[0].offsetWidth, '360', 'assert width is 360px by default');
  assert.equal(this.$('.shrinking-box')[0].offsetHeight, '360', 'assert height is 360px by default');
  assert.equal(this.$('.shrinking-box').css("background-color"), "rgb(200, 200, 200)", 'assert color is rgb(200, 200, 200)');
});

test('it has css transition properties', function(assert) {
  this.render(hbs`{{shrinking-box bigMessage="Big Message!" smallMessage="Small Message!"}}`);
  assert.equal(this.$('.shrinking-box').css("transition"), "width 0.5s ease 0s, height 0.5s ease 0s, background-color 0.5s ease 0s, color 0.5s ease 0s", 'assert shrinking box has transition properties');
});

test('it renders bigMessage when isSmall is false', function(assert) {
  this.render(hbs`{{shrinking-box bigMessage="Big Message!" smallMessage="Small Message!"}}`);
  assert.equal(this.$('.shrinking-box').text().trim(), "Big Message!", 'assert default text is bigMessage');
});

test('it renders smallMessage when isSmall is true', function(assert) {
  this.render(hbs`{{shrinking-box bigMessage="Big Message!" smallMessage="Small Message!"}}`);
  this.$('.shrinking-box').click();

  assert.equal(this.$('.shrinking-box.is-small').text().trim(), "Small Message!", 'assert smallMessage displayed');
});

test('it has flexbox properties', function(assert) {
  this.render(hbs`{{shrinking-box bigMessage="Big Message!" smallMessage="Small Message!"}}`);
  assert.equal(this.$('.shrinking-box').css("display"), "flex", 'assert shrinking box display is flex');
  assert.equal(this.$('.shrinking-box').css("align-items"), "center", 'assert shrinking box align-items is center');
  assert.equal(this.$('.shrinking-box').css("justify-content"), "space-around", 'assert shrinking box justify-content is space-around');

  //needs assertions
});