
const Eureka = require('eureka-js-client').Eureka;

const client = new Eureka({
  instance: {
    instanceId: 'MARKETUSERSERVICE',
    app: 'MARKETUSERSERVICE',
    hostName: 'market-user-service',
    ipAddr: 'market-user-service',
    statusPageUrl: 'http://market-user-service:4000',
    port: {
      '$': 4000,
      '@enabled': 'true',
    },
    vipAddress: 'MARKETUSERSERVICE',
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