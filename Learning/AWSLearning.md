# Getting Started with AWS

Amazon Web Services is a comprehensive cloud computing platform that includes **infraestructure as a service (IaaS)** and **platform as a servie (PaaS)** offerings.

AWS services offer scalable solutions for compute, databases, analytics...

To get started with AWS:

- [Set up Account and Environment](#best-parctices)

- [AWS Management Console](#management-console)

- [Install AWS Cloud Development Kit](#aws-cdk)

# AWS Account

Once the email and the password are set. In the next screen, choose between a business or personal account. There is no difference in account type or functionality, but there is a difference in the type of information required to open the account for biling purposes.

For a business acount, choose a phone number that is tied to the business and can be reached if the person setting up the account is not available.

For the last step, choose a support plan for your AWS account. The default option is called Basic Support and is free of charge. If you are not sure, select Basic Support. You can alwasy change support tiers at later date.

## Secure AWS account

Let's start by securing the root user. To do that, we'll use the AWS **IAM** service.

### What is IAM?

Is a web service that helps you securely control access to AWS resources. With IAM, you can centrally manage permissions that control which AWS resoureces can access. You use IAM to control who is authenticated (signed in) and authorized (has permissions) to use resources.

When you create an AWS account, you begin with one sign-in identify that has complete access to all AWS services and resources in the acccount. This identity is called the AWS account _root user_ and is accessed by signing in with the email address and password that you used to create the account.


