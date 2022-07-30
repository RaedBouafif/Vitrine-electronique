
const Eureka = require('eureka-js-client').Eureka;

const client = new Eureka({
  instance: {
    instanceId: 'MARKETORDERSERVICE',
    app: 'MARKETORDERSERVICE',
    hostName: 'market-order-service',
    ipAddr: 'market-order-service',
    statusPageUrl: 'http://market-order-service:4003',
    port: {
      '$': 4003,
      '@enabled': 'true',
    },
    vipAddress: 'MARKETORDERSERVICE',
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