var expect = require('chai').expect;
var Supercollider = require('..').Supercollider;

var TEST_FILE = require('./fixtures/test_file');

describe('Supercollider.parse()', function() {
  it('converts Markdown into HTML', function(done) {
    var s = new Supercollider();
    s.config({
      template: 'test/fixtures/template.html'
    });

    s.parse(TEST_FILE, {}).then(data => {
      expect(data).to.be.an('object');
      expect(data.docs).to.contain('<h2');
      done();
    });
  });

  it('does not touch Markdown if configured to ignore it', function(done) {
    var s = new Supercollider();
    s.config({
      template: 'test/fixtures/template.html',
      marked: null
    });

    s.parse(TEST_FILE).then(data => {
      expect(data).to.be.an('object');
      expect(data.docs).to.not.contain('<h2');
      done();
    });
  });

  it('loads data from adapters', function(done) {
    var s = new Supercollider();
    s.config({
      template: 'test/fixtures/template.html',
      marked: null
    }).adapter('sass').adapter('js');

    s.parse(TEST_FILE).then(data => {
      expect(data._adapterData).to.have.all.keys(['sass', 'js']);
      expect(data.sass).to.be.an('object');
      expect(data.js).to.be.an('object');
      done();
    });
  });

  it('catches Markdown errors', function(done) {
    var s = new Supercollider();
    s.config({
      template: 'test/fixtures/template.html',
      marked: require('./fixtures/marked-broken')
    });

    s.parse(TEST_FILE).catch(e => {
      expect(e).to.be.an.instanceOf(Error);
      done();
    });
  });
});