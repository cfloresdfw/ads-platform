'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var AdsSchema = new mongoose.Schema({
  name: String,
  info: String,
  url:  String,
  img: { data: Buffer, contentType: String },
  active: Boolean
});

export default mongoose.model('Ads', AdsSchema);
