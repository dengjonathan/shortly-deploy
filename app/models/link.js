const mongoose = require('mongoose');
const db = require('../config');
const crypto = require('crypto');
const Promise = require('bluebird');

var linkSchema = mongoose.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
});

var Link = mongoose.model('Link', linkSchema);

Link.prototype.hashUrl = function() {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
};

Link.prototype.saveUrl = function(cb) {
  console.log('Saving link url', this);
  this.hashUrl();
  this.save(function(err, url) {
    cb(err, url);
  });
};

module.exports = Link;
