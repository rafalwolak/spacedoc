const { expect } = require('chai');
const getPageOrder = require('../lib/util/getPageOrder');

describe('getPageOrder()', () => {
  it('gets the order number from a filename', () => {
    expect(getPageOrder('path/to/01-intro.md')).to.equal(1);
  });

  it('returns null for a filename with no number', () => {
    expect(getPageOrder('path/to/intro.md')).to.be.null;
  });
});
