import App from '../app';
import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Component.extend({
  store: service(),
  tagName: '',
  init() {
    this._super(...arguments);
    this.data = [];
  },

  didReceiveAttrs() {
    let query = this.query;
    this.fetchData.perform(query);
  },

  fetchData: task(function*(query) {
    yield timeout(1000);
    let podcasts = this.store.queryRecord('podcast', query).then((podcast) => {
      return hash({
        tracks: podcast.get('tracks'),
        meta: App.storeMeta['podcast'],
        labels: this.store.findAll('label'),
      });
    });
    let resolvedPodcasts = yield podcasts;
    return this.set('data', resolvedPodcasts);
  }).restartable()
});
