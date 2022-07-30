
const Eureka = require('eureka-js-client').Eureka;

const client = new Eureka({
  instance: {
    instanceId: 'MARKETGALLERYSERVICE',
    app: 'MARKETGALLERYSERVICE',
    hostName: 'market-gallery-service',
    ipAddr: 'market-gallery-service',
    statusPageUrl: 'http://market-gallery-service:4005',
    port: {
      '$': 4005,
      '@enabled': 'true',
    },
    vipAddress: 'MARKETGALLERYSERVICE',
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