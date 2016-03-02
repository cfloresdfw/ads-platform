'use strict';

var app = require('../../../server');
import request from 'supertest';

var newAds;

describe('Ads API:', function() {

  describe('GET /api/ads', function() {
    var adss;

    beforeEach(function(done) {
      request(app)
        .get('/api/ads')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          adss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      adss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/ads', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/ads')
        .send({
          name: 'New Ads',
          info: 'This is the brand new ads!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newAds = res.body;
          done();
        });
    });

    it('should respond with the newly created ads', function() {
      newAds.name.should.equal('New Ads');
      newAds.info.should.equal('This is the brand new ads!!!');
    });

  });

  describe('GET /api/ads/:id', function() {
    var ads;

    beforeEach(function(done) {
      request(app)
        .get('/api/ads/' + newAds._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          ads = res.body;
          done();
        });
    });

    afterEach(function() {
      ads = {};
    });

    it('should respond with the requested ads', function() {
      ads.name.should.equal('New Ads');
      ads.info.should.equal('This is the brand new ads!!!');
    });

  });

  describe('PUT /api/ads/:id', function() {
    var updatedAds;

    beforeEach(function(done) {
      request(app)
        .put('/api/ads/' + newAds._id)
        .send({
          name: 'Updated Ads',
          info: 'This is the updated ads!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAds = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAds = {};
    });

    it('should respond with the updated ads', function() {
      updatedAds.name.should.equal('Updated Ads');
      updatedAds.info.should.equal('This is the updated ads!!!');
    });

  });

  describe('DELETE /api/ads/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/ads/' + newAds._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when ads does not exist', function(done) {
      request(app)
        .delete('/api/ads/' + newAds._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
