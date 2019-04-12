import Component from '@ember/component';
import { oneWay } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Component.extend({
  chat: service(),
  classNames: ['main-content'],
  gifsEnabled: oneWay('chat.gifsEnabled'),
  newMessagesBelow: false,
  isJoiningChat: false,
  joinedChat: oneWay('chat.joinedChat'),
  messages: oneWay('chat.messages'),
  joinedUsers: oneWay('chat.joinedUsers'),
  actions: {
    toggleGifsEnabled(){
      this.chat.toggleProperty("gifsEnabled");
    },
    enterChat(){
      this.set('isJoiningChat', true);
      const nick = this.nick.trim();
      const pass = this.pass;
      this.attrs.authenticate(nick, pass);
    },
    newMessagesAvailable(){
      this.set("newMessagesBelow", true);
    }
  },
  scrolledToBottom() {
    return $('#messages')[0].scrollHeight - $('#messages')[0].scrollTop - $('#messages').outerHeight() < 1;
  },
  _onScroll(){
    if(this.scrolledToBottom()){
      this.set("newMessagesBelow", false);
    }else{
      this.set("newMessagesBelow", true);
    }
    this.chat.set('scrollTop', $('#messages')[0].scrollTop);
  },
  didInsertElement(){
    var onScroll = this._onScroll.bind(this);
    this.$("#messages").bind('touchmove', onScroll);
    this.$("#messages").bind('scroll', onScroll);
    this.$("#messages")[0].scrollTop = this.get('chat.scrollTop');
  }
});
