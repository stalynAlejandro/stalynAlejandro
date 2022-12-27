# Deploy a Container Web App on EC2

Build and deploy a container-based web application using Amazon Elastic Container Service. (ECS).

ECS is a fully managed container orchestration service that helps you easily deploy, manage, and scale containerized applications. It deeply integrates with the rest of the AWS platform to provide a secure and easy-to-use solution for running container workloads in the cloud and now on your infraestructure.

An orchestrator manages the lifecycle of your container, from deploying it, ensuring that it is healthy, replacing unhelthy nodes, and handling new deployments.

## What are the components of ECS

An ECS cluster is a logical construct that will group all the containers deployed into a cluster.

_There is no cost for a cluster, only for the compute and other infraestructure you use to run your containers._

To launch a container you provide **a task definition** which contain properties like the container image location, amount of CPU and memory, logging configuration and many more. This does not launch a container, it just provides all the configuration needed to be able to run it - **to launch it**, you will define a **service**.

In **the service** you define how many copies of the container you want. To expose your services to the internet, you will need to set up an **Application Load Balancer** to forward requests to your service.

Lastly, ECS can be configured to deploy accross multiple availability zones, and will automatically balance the deployment across the number of AZs available and update the load balancer with details of each deployment to allow traffic to be routed to it.

## Compute capacity planning and options

ECS is able to schedule services to run on an **EC2 host (virtual machine)**, or using **Amazon Fargate, a serverless compute engine for containers**.

When running containers, you need to take capacity planning into account. As an example, if you have 2 hosts available in your cluster, each with 512MB of memory, the cluster will show a total of 1024MB of memory available, byt you won't be able to launch a new container that requires more than 512MB of memory as there is no single host with enough memory. _This can be mitigated by using capacity providers to autoscale the cluster_.

Alternatively, you can use Fargate, which allows you to specify the CPU and memory requirements for each container, and then launches the required compute to run the container for you. The main difference between Fargate and EC2 hosts is that you do no need to set up, manage or maintain the operating system on the host when using Fargate, nor do you need to do capcaity as it will launch exactly the amount of capacity you need.

# Create Infraestructure and Deploy Application

### Boostrap your AWS account

Bootstraping is the process of creating containers in the AWS account and region you are deploying to.

Many of the AWS CDK stacks you deploy include assets and external files, such as AWS Lambda functions or Docker images.

The CDK uploads these assets and files to the containers created during bootstrapping, so they can be available to AWS CloudFormation during deployment.

To bootstrap your account you need your AWS account number and your region.

```
// To get your AWS account number , use the following AWS CLI command
aws sts get-caller-identity

╭─saav@csaav ~/stalynAlejandro ‹main●›
╰─$ aws sts get-caller-identity | cat
{
    "UserId": "AXXXXXXXXXXXXXXXXXXX4",
    "Account": "1XXXXXXXXXX9",
    "Arn": "arn:aws:iam::1XXXXXXXXXX9:user/sXXXXXXXXXXXXXo"
}
```

```
// To display the default region for your account, use:

aws configure get region

╭─saav@csaav ~/stalynAlejandro ‹main●›
╰─$ aws configure get region
eXXXXXXXX2

```

```
// Now you can boostrap the account with the following command

cdk bootstrap aws://ACCOUNT-NUMBER/REGION

cdk bootstrap aws://1XXXXXXXXXX9/eXXXXXXXX2
```

This should take care of everything you need to start working with AWS CDK. Once you have the CLI installed and the AWS account and region combination bootstrapped, you can start writing and deploying some infraestructure.

```
╭─saav@csaav ~/stalynAlejandro ‹main●›
╰─$ cdk bootstrap aws://1XXXXXXXXXX9/eXXXXXXXX2
 ⏳  Bootstrapping environment aws://1XXXXXXXXXX9/eXXXXXXXX2...
Trusted accounts for deployment: (none)
Trusted accounts for lookup: (none)
Using default execution policy of 'arn:aws:iam::aws:policy/AdministratorAccess'. Pass '--cloudformation-execution-policies' to customize.
CDKToolkit: creating CloudFormation changeset...
 ✅  Environment aws://1XXXXXXXXXX9/eXXXXXXXX2 bootstrapped.
```

### Create First AWS CDK Project

We use the **AWS CDK CLI** to create a new infraestructure project using TypeScript. We also learn how to write a simple resource and how to synthesize and deploy your **CDK** code.

Synthesizing is how CDK turns your infraestructure code into **AWS CloudFormation Templates**.

```
// To get started, we create an empty directory using the *mkdir*
// command and change the working directory using the *cd* command:

mkdir cdk-demo
cd cdk-demo


// We use the *cdk init* command and specify that we want to create
// a new TypeScript CDK project:

cdk init ---language typescript
```

The **cdk init** command creates the folder structure and installs some of the necessary modules required for a TypeScript CDK project. The output looks somethings like this:

```
Apply project template app for tpyescript
...
// Now let's review the files that the cdk init commands created:

- bin
  - cdk-demo.ts
- lib
  - cdk-demo-stack.ts
- node_modules
  - //list of modules
- test
  - cdk-demo.test.ts
- .gitignore
- .npmignore
- cdk.json
- jest.config.js
- package.json
- package-lock.json
- README.md
- tsconfig.json

```

Here are some of the important files and what they are used for:

- **bin/cdk-demo.ts** This is the entry point to your CDK application. This will load/create all the stack we define under \*lib/\*\*

- **lib/cdk-demo-stack.ts** This is where your main CDK application stack is defined. Your resources and its properties can go here.

- **package.json** This is where you define your project dependencies, as well as some additional information, and build scripts (npm build, npm test, npm watch).

- **cdk.json** This file tells the toolkit how to run your application and also contains some additional settings and parameters related to CDK and your project.

For this tutorial, we will be focusing on **lib/cdk-demo-stack.ts** and **bin/cdk-demo.ts** files to create our infraestructure. Let's add some code.

### Create the infraestructure

To start building out a project, a common starting point is to create a logically isolated virtual network that you define, **called an Amazon Virtual Private Cloud (Amazon VPC)**.

Before we define our VPC in the main stack, we need to ensure we deploy to the correct account and region. While the CDK pulls this information from your local AWS CLI configuration, it is best to configure this manually in your CDK code to avoid incorrect values when that configuration changes.

This step is required, due to settings we will be defining in our VPC. If you do not specify this, the stack will be environment-agnostic, but some features and context looksups will not work.

Modify your **bin/cdk-demot.ts** stack to look something like this:

```
#!/usr/bin/env  node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {CdkDemoStack} from '../lib/cdk-demo-stack';

const app = new cdk.App();
new CdkDemoStack(app, 'CdkDemoStack', {
  env: {account:'ACCOUNT-NUMBER', region:"us-east-1"}
})

```

We will create a VPC with two public-facing subnets, spread across two availability zones.

Before we can dive into writting the code, we need to explain and install **AWS CDK construct library modules**.

A construct can represent a single AWS resource, such as an **Amazon Simple Storage Service (Amazon S3) bucket**, or it can be a higher-level abstraction consisting of multiple AWS related resources.

We need the Amazon EC2 module, which also includes support for Amazon VPCs.

To install the Amazon EC2 module, we will use npm. Run the following command while in your project directory:

```
npm install @aws-cdk/aws-ec2
```

This command install all the necessary modules. If you look in your package.json file, you will see that it was also added there.

Now, we are ready to create our VPC. Open up your stack definition in **lib/cdk-demo-stack.ts**. When first opening up the file, you should see someting like this:

```
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

  }
}

```

This is the skeleton of our project. If you ran CDK now, no resources would be created as we don't have any defined yet.

To get started with the VPC, we need to import the EC2 module we just installed:

```
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class CdkDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

  }
}

```

When creating a VPC, we can set a number of properties to tailor it to our needs. By default, it creates a VPC acorss three availability zones (AZs), with public and private subnets (with a single Internet gateway and three NAT gateways).

For this tutorial, we want to create a very simple setup spanning two AZs, and with public subnet for each.

To create our VPC, we will specify two AZs and the details to create a public subnet, as shown in the following code:

```js
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";

export class CdkDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // We have created the VPC object from the VPC class
    new ec2.Vpc(this, "mainVPC", {
      // This is where you can define how many AZs you want to use
      maxAZs: 2,
      // This is where you can define the subnet configuration per AZ
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "public-subnet",
          subnetType: ec2.SubnetType.PUBLIC,
        },
      ],
    });
  }
}
```

Now we are ready to deploy this infraestructure change to our account.

### Deploy your code

Now its time to test and deploy your code.

To see if your code is valid, you can run _npm build_ which will compile TypeScript to JavaScript.

```
npm run build
```

If you don't get any errors, you can run the **cdk deploy** command:

```
cdk deploy
```
