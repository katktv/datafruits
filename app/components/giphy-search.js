import Component from '@ember/component';
import { observer } from '@ember/object';
import { debounce } from '@ember/runloop';

export default Component.extend({
  observeQuery: observer('searchTerm', function(){ //eslint-disable-line ember/no-observers
    debounce(this, this.setQuery, 500);
  }),
  setQuery(){
    this.set('query', this.searchTerm)
  }
});
