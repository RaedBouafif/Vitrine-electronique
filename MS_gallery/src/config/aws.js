var AWS = require('aws-sdk')

const REGION = 'eu-west-1'
const ACCESS_KEY = 'AKIAU2JDWFYPUKR7FS4N'
const SECRET_KEY = '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'


AWS.config.update({
    region: 'eu-west-1',
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY
  })
  
  var s3 = new AWS.S3();

  module.exports = s3