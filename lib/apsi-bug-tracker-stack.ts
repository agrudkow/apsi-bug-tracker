import * as path from 'path';

import { LambdaIntegration, RestApi } from '@aws-cdk/aws-apigateway';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { PythonFunction } from '@aws-cdk/aws-lambda-python';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as rds from '@aws-cdk/aws-rds';
import * as dotenv  from 'dotenv';

dotenv.config()

export class APSIBugTrackerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //Lambda to GET all issues from 'zgloszenia' table
    const getAllIssuesLambda = new PythonFunction(this, 'GetAllIssuesLambda', {
      entry: path.join('lambda'), // path to file with lambda handler
      index: 'handler.py', // file with lambda handler
      handler: 'lambda_handler', // name of lambda handler function
      runtime: lambda.Runtime.PYTHON_3_9,
      environment: {
        LOG_LEVEL: '10', // Debug log level
      },
    });

    // Integrate GetAllIssuesLambda with API Gateway
    const getAllIssuesLambdaIntegration = new LambdaIntegration(getAllIssuesLambda);

    // Create API Gateway resource
    const apiGateway = new RestApi(this, 'APSIBugTrackerAPI', {
      restApiName: 'APSI BugTracker',
    });

    // Attach GetAllIssuesLambda integration to API Gateway
    const getAllIssuesRoute = apiGateway.root.addResource('zgloszenia');
    getAllIssuesRoute.addMethod('GET', getAllIssuesLambdaIntegration);
	
    // Create DB security group
    const vpc = ec2.Vpc.fromLookup(this, 'VPC', {isDefault: true})
	
    const APSIBugTrackerSG = new ec2.SecurityGroup(this, 'ApsiBugTracker-sg', {
      vpc,
      allowAllOutbound: true,
      description: 'Security group for the APSIBugTracker.',
    });

    APSIBugTrackerSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.allTraffic(),
    );

    // Create database instance
    const instance = new rds.DatabaseInstance(this, 'ApsiBugTrackerDB', {
      engine: rds.DatabaseInstanceEngine.mysql({ version: rds.MysqlEngineVersion.VER_8_0_26 }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
      allocatedStorage: 20,
      credentials: rds.Credentials.fromPassword(process.env.DB_USER ?? 'user', cdk.SecretValue.plainText(process.env.DB_PASS ?? 'password')),
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      securityGroups: [APSIBugTrackerSG],
      databaseName: 'apsidb',
      backupRetention: cdk.Duration.days(0)
    });
  }
}
