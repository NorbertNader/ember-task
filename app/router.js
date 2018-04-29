import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('html-css-exercise');
  this.route('credit-card-exercise');
  this.route('coding-exercise');
});

export default Router;
