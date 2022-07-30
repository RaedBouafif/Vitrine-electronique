
const Eureka = require('eureka-js-client').Eureka;

const client = new Eureka({
  instance: {
    instanceId: 'MARKETBANNERSERVICE',
    app: 'MARKETBANNERSERVICE',
    hostName: 'market-banner-service',
    ipAddr: 'market-banner-service',
    statusPageUrl: 'http://market-banner-service:4006',
    port: {
      '$': 4006,
      '@enabled': 'true',
    },
    vipAddress: 'MARKETBANNERSERVICE',
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