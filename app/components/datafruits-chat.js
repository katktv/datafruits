import Component from '@ember/component';
import { oneWay } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  chat: service(),
  classNames: ['main-content'],
  gifsEnabled: oneWay('chat.gifsEnabled'),
  newMessagesBelow: false, // TODO move this to chat service
  isJoiningChat: false,
  nick: "",
  joinedChat: oneWay('chat.joinedChat'),
  messages: oneWay('chat.messages'),
  joinedUsers: oneWay('chat.joinedUsers'),
  disableJoinButton: computed('isJoiningChat', 'nick', function(){
    return this.nick.length < 1 || this.isJoiningChat === true;
  }),
  actions: {
    toggleGifsEnabled(){
      this.chat.toggleProperty("gifsEnabled");
    },
    enterChat(){
      this.set('isJoiningChat', true);
      const nick = this.nick.trim();
      this.chat.push("authorize", { user: nick, timestamp: Date.now() });
    },
    newMessagesAvailable(){
      this.set("newMessagesBelow", true);
    },
    onScroll(){
      if(this.scrolledToBottom()){
        this.set("newMessagesBelow", false);
      }else{
        this.set("newMessagesBelow", true);
      }
      this.chat.set('scrollTop', document.getElementById('messages').scrollTop);
    },
  },
  scrolledToBottom() {
    const messages = document.getElementById('messages');
    const messagesHeight = messages.getBoundingClientRect().height;
    return messages.scrollHeight - messages.scrollTop - messagesHeight < 1;
  },
  didInsertElement(){
    //var onScroll = this._onScroll.bind(this);
    const messages = document.getElementById('messages');
    // this.$("#messages").bind('touchmove', onScroll);
    // this.$("#messages").bind('scroll', onScroll);
    messages.scrollTop = this.get('chat.scrollTop');
  }
});
