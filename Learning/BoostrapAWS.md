# Bootstrap your AWS account

Bootstraping is the process of creating containers in the AWS account and region you are deploying to. 

Many of the AWS CDK stacks you deploy include assets and external files, such as AWS Lambda functions or Docker images. 

The CDK uploads these assets and files to the containers created during bootstrapping, so they can be available to AWS CloudFormation during deployment. 

To bootstrap your account you need your AWS account number and your region. 


