const Data = require('./mock-adapter-data');

module.exports = class MockAdapter {
  static parse(value, config) {
    return Promise.resolve(Data);
  }

  static group(item) {
    return item.group;
  }

  static filter(item) {
    return item.private === true;
  }

  static search(item, link) {
    return {
      name: item.value,
      type: item.group,
      description: item.value,
      link: `${link}#${item.value}`
    }
  }

  static config() {
    return {}
  }
}
