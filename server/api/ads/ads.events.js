/**
 * Ads model events
 */

'use strict';

import {EventEmitter} from 'events';
var Ads = require('./ads.model');
var AdsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AdsEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Ads.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    AdsEvents.emit(event + ':' + doc._id, doc);
    AdsEvents.emit(event, doc);
  }
}

export default AdsEvents;
