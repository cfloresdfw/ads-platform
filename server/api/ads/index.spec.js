'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var adsCtrlStub = {
  index: 'adsCtrl.index',
  show: 'adsCtrl.show',
  create: 'adsCtrl.create',
  update: 'adsCtrl.update',
  destroy: 'adsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var adsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './ads.controller': adsCtrlStub
});

describe('Ads API Router:', function() {

  it('should return an express router instance', function() {
    adsIndex.should.equal(routerStub);
  });

  describe('GET /api/ads', function() {

    it('should route to ads.controller.index', function() {
      routerStub.get
        .withArgs('/', 'adsCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/ads/:id', function() {

    it('should route to ads.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'adsCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/ads', function() {

    it('should route to ads.controller.create', function() {
      routerStub.post
        .withArgs('/', 'adsCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/ads/:id', function() {

    it('should route to ads.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'adsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/ads/:id', function() {

    it('should route to ads.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'adsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/ads/:id', function() {

    it('should route to ads.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'adsCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
