import * as path from 'path';

import { LambdaIntegration, RestApi } from '@aws-cdk/aws-apigateway';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { PythonFunction } from '@aws-cdk/aws-lambda-python';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as rds from '@aws-cdk/aws-rds';

export class APSIBugTrackerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create example Lambda func
    const exampleLambda = new PythonFunction(this, 'ExampleLambda', {
      entry: path.join('lambda', 'example_lambda'), // required
      index: 'index.py', // Optional, defaults to 'index.py'
      handler: 'handler', // Optional, defaults to 'handler'
      runtime: lambda.Runtime.PYTHON_3_9, // Optional, defaults to lambda.Runtime.PYTHON_3_7
      environment: {
        LOG_LEVEL: '10', // Debug log level - https://docs.python.org/3/library/logging.html
      },
    });

    // Integrate Lambda with API Gateway
    const exampleLambdaIntegration = new LambdaIntegration(exampleLambda);

    // Create API Gateway resource
    const apiGateway = new RestApi(this, 'APSIBugTrackerAPI', {
      restApiName: 'APSI BugTracker',
    });

    // Attach Lambda integration to API Gateway
    const exampleRoute = apiGateway.root.addResource('example');
    exampleRoute.addMethod('GET', exampleLambdaIntegration);
    const IDExampleRoute = exampleRoute.addResource('{id}');
    IDExampleRoute.addMethod('GET', exampleLambdaIntegration);
	
	// Create DB security group
	const vpc = ec2.Vpc.fromLookup(this, 'VPC', {isDefault: true})
	
	const APSIBugTrackerSG = new ec2.SecurityGroup(this, 'ApsiBugTracker-sg', {
      vpc,
	  allowAllOutbound: true,
      description: 'security group for the APSIBugTracker',
    });

    APSIBugTrackerSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.allTraffic(),
    );

	APSIBugTrackerSG.addIngressRule(
      ec2.Peer.anyIpv6(),
      ec2.Port.allTraffic(),
    );

	// Create database instance
	const instance = new rds.DatabaseInstance(this, 'Instance', {
      engine: rds.DatabaseInstanceEngine.mysql({ version: rds.MysqlEngineVersion.VER_8_0_26 }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
	  allocatedStorage: 20,
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
