
const Eureka = require('eureka-js-client').Eureka;

const client = new Eureka({
  instance: {
    instanceId: 'MARKETCATEGORYSERVICE',
    app: 'MARKETCATEGORYSERVICE',
    hostName: 'market-category-service',
    ipAddr: 'market-category-service',
    statusPageUrl: 'http://market-category-service:4002',
    port: {
      '$': 4002,
      '@enabled': 'true',
    },
    vipAddress: 'MARKETCATEGORYSERVICE',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
    registerWithEureka: true,
    fetchRegistry: true,
  },
  eureka: {
    host: 'market-eureka-service',
    port: 8761,
    servicePath: '/eureka/apps/',
  }
});
client.logger.level('debug');
module.exports = client