'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var AdsSchema = new mongoose.Schema({
  name: String,
  info: String,
  url:  String,
  client_id: Number,
  img: { data: Buffer, contentType: String },
  active: Boolean
});

export default mongoose.model('Ads', AdsSchema);
