import * as path from 'path';

import { LambdaIntegration, RestApi } from '@aws-cdk/aws-apigateway';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { PythonFunction } from '@aws-cdk/aws-lambda-python';

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
  }
}
