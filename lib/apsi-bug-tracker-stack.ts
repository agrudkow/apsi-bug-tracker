import * as path from 'path';

import { LambdaIntegration, RestApi } from '@aws-cdk/aws-apigateway';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { PythonFunction } from '@aws-cdk/aws-lambda-python';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as rds from '@aws-cdk/aws-rds';
import * as dotenv from 'dotenv';

dotenv.config();

export class APSIBugTrackerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const DB_NAME = process.env.DB_NAME ?? 'apsidb'
    const DB_USERNAME = process.env.DB_USERNAME ?? 'user'
    const DB_PASSWORD = process.env.DB_PASSWORD ?? 'password'

    // Create DB security group
    const vpc = ec2.Vpc.fromLookup(this, 'VPC', { isDefault: true });

    const APSIBugTrackerSG = new ec2.SecurityGroup(this, 'ApsiBugTracker-sg', {
      vpc,
      allowAllOutbound: true,
      description: 'Security group for the APSIBugTracker.',
    });

    APSIBugTrackerSG.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.allTraffic());

    // Create database instance
    const instance = new rds.DatabaseInstance(this, 'ApsiBugTrackerDB', {
      engine: rds.DatabaseInstanceEngine.mysql({
        version: rds.MysqlEngineVersion.VER_8_0_26,
      }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.BURSTABLE2,
        ec2.InstanceSize.MICRO
      ),
      allocatedStorage: 20,
      credentials: rds.Credentials.fromPassword(
        DB_USERNAME,
        cdk.SecretValue.plainText(DB_PASSWORD)
      ),
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      securityGroups: [APSIBugTrackerSG],
      databaseName: DB_NAME,
      backupRetention: cdk.Duration.days(0),
    });

    // Get all issues lambda
    const getIssuesLambda = new PythonFunction(this, 'GetIssues', {
      entry: path.join('lambda', 'get_issues'), // required
      index: 'index.py', // Optional, defaults to 'index.py'
      handler: 'handler', // Optional, defaults to 'handler'
      runtime: lambda.Runtime.PYTHON_3_9, // Optional, defaults to lambda.Runtime.PYTHON_3_7
      environment: {
        LOG_LEVEL: '10', // Debug log level - https://docs.python.org/3/library/logging.html
        DB_HOST: instance.dbInstanceEndpointAddress,
        DB_USERNAME: DB_USERNAME,
        DB_PASSWORD: DB_PASSWORD,
        DB_NAME: DB_NAME,
      },
    });

    // Create issues lambda
    const createIssuesLambda = new PythonFunction(this, 'CreateIssues', {
      entry: path.join('lambda', 'create_issues'), // required
      index: 'index.py', // Optional, defaults to 'index.py'
      handler: 'handler', // Optional, defaults to 'handler'
      runtime: lambda.Runtime.PYTHON_3_9, // Optional, defaults to lambda.Runtime.PYTHON_3_7
      environment: {
        LOG_LEVEL: '10', // Debug log level - https://docs.python.org/3/library/logging.html
        DB_HOST: instance.instanceEndpoint.hostname,
        DB_USERNAME: DB_USERNAME,
        DB_PASSWORD: DB_PASSWORD,
        DB_NAME: DB_NAME,
      },
    });

    const getIssuesLambdaIntegration = new LambdaIntegration(getIssuesLambda);
    const createIssuesLambdaIntegration = new LambdaIntegration(createIssuesLambda);

    // Create API Gateway resource
    const apiGateway = new RestApi(this, 'APSIBugTrackerAPI', {
      restApiName: 'APSI BugTracker',
    });

    // Attach Lambda integration to API Gateway
    const issuesRoute = apiGateway.root.addResource('issues');
    issuesRoute.addMethod('GET', getIssuesLambdaIntegration);
    issuesRoute.addMethod('PUT', createIssuesLambdaIntegration);
  }
}
