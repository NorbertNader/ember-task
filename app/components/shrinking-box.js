import Ember from 'ember';

//Refer to ember component documentation as necessary: http://emberjs.com/api/classes/Ember.Component.html
export default Ember.Component.extend({

  defaultToLarge: Ember.on('init', function(){
    //http://emberjs.com/api/classes/Ember.Object.html#method_set
    this.set('isSmall', false);
  }),

  //set in html-css-exercise template
  bigMessage: '',

  //set in html-css-exercise template template
  smallMessage: '',

  isSmall: false,

  classNames: ['shrinking-box'],

  //https://guides.emberjs.com/v2.12.0/components/customizing-a-components-element/
  classNameBindings: ['isSmall:is-small:is-large'],

  click: function(){
    //toggle this component's isSmall property here
    this.toggleProperty('isSmall');
  }

});
