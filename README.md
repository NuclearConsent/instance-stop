# instance-stop
A collection of Lambda functions that can automatically stop EC2 &amp; RDS instances at a specific time.

## Deploy
Deploy with [serverless](https://serverless.com/)
```
serverless deploy --region ca-central-1
```

Expected output:
```
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
........
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service stopinstances.zip file to S3 (7.04 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
....................................
Serverless: Stack update finished...
Service Information
service: stopinstances
stage: dev
region: ca-central-1
stack: stopinstances-dev
resources: 13
api keys:
  None
endpoints:
  None
functions:
  rds: stopinstances-dev-rds
  ec2: stopinstances-dev-ec2
layers:
  None
```


## Support

This is an Open Source community project. Project contributors may be able to help, 
depending on their time and availability. Please be specific about what you're 
trying to do, your system, and steps to reproduce the problem.