import Route from '@ember/routing/route';
import ENV from 'datafruits/config/environment';

export default Route.extend({
  afterModel() {
    this.setHeadTags();
  },

  setHeadTags() {
    const headTags = ENV.headTags;
    this.set('headTags', Object.values(headTags));
  },
});
