import * as path from 'path';

import { Cors, LambdaIntegration, RestApi } from '@aws-cdk/aws-apigateway';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as rds from '@aws-cdk/aws-rds';
import * as dotenv from 'dotenv';
import * as iam from '@aws-cdk/aws-iam';

dotenv.config();

export class APSIBugTrackerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const DB_NAME = process.env.DB_NAME ?? 'apsidb';
    const DB_USERNAME = process.env.DB_USERNAME ?? 'user';
    const DB_PASSWORD = process.env.DB_PASSWORD ?? 'password';
    const DB_PORT = process.env.DB_PORT ?? '3306';

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

    // ------------------------------------------------------------ Lambda Layers ----------------------------------------------------

    // Create database lambda layer
    const databaseLayer = new lambda.LayerVersion(this, 'database-layer', {
      code: lambda.Code.fromAsset(path.join('lambda', 'database'), {
        bundling: {
          image: lambda.Runtime.PYTHON_3_9.bundlingImage,
          command: [
            'bash',
            '-c',
            'pip install . -t /asset-output/python && cp -r alembic /asset-output/python/apsi_database && cp alembic.ini /asset-output/python/apsi_database',
          ],
        },
      }),
    });

    // ------------------------------------------------------------ Lambdas ----------------------------------------------------------

    // Create lambda to send email notifications
    const mailerLambda = new lambda.Function(this, 'MailerLambda', {
      code: lambda.Code.fromAsset(path.join('lambda', 'mail_notifications'), {
        bundling: {
          image: lambda.Runtime.PYTHON_3_9.bundlingImage,
          command: [
            'bash',
            '-c',
            'pip install -r requirements.txt -t /asset-output &&  rsync -av -O --progress . /asset-output --exclude-from=.dockerignore',
          ],
        },
      }),
      handler: 'index.handler',
      runtime: lambda.Runtime.PYTHON_3_9,
      environment: {
        LOG_LEVEL: '10', // Debug log level - https://docs.python.org/3/library/logging.html
        DB_HOST: instance.instanceEndpoint.hostname,
        DB_USERNAME: DB_USERNAME,
        DB_PASSWORD: DB_PASSWORD,
        DB_NAME: DB_NAME,
        DB_PORT: DB_PORT,
      },
    });

    // Get all problems lambda
    const getProblemsLambda = new lambda.Function(this, 'GetProblems', {
      code: lambda.Code.fromAsset(path.join('lambda', 'get_problems'), {
        bundling: {
          image: lambda.Runtime.PYTHON_3_9.bundlingImage,
          command: [
            'bash',
            '-c',
            'pip install -r requirements.txt -t /asset-output &&  rsync -av -O --progress . /asset-output --exclude-from=.dockerignore',
          ],
        },
      }),
      handler: 'index.handler', // Optional, defaults to 'handler'
      runtime: lambda.Runtime.PYTHON_3_9, // Optional, defaults to lambda.Runtime.PYTHON_3_7
      environment: {
        LOG_LEVEL: '10', // Debug log level - https://docs.python.org/3/library/logging.html
        DB_HOST: instance.dbInstanceEndpointAddress,
        DB_USERNAME: DB_USERNAME,
        DB_PASSWORD: DB_PASSWORD,
        DB_NAME: DB_NAME,
        DB_PORT: DB_PORT,
      },
      layers: [databaseLayer],
    });

    // Create problem lambda
    const createProblemLambda = new lambda.Function(this, 'CreateProblem', {
      code: lambda.Code.fromAsset(path.join('lambda', 'create_problem'), {
        bundling: {
          image: lambda.Runtime.PYTHON_3_9.bundlingImage,
          command: [
            'bash',
            '-c',
            'pip install -r requirements.txt -t /asset-output &&  rsync -av -O --progress . /asset-output --exclude-from=.dockerignore',
          ],
        },
      }),
      handler: 'index.handler', // Optional, defaults to 'handler'
      runtime: lambda.Runtime.PYTHON_3_9, // Optional, defaults to lambda.Runtime.PYTHON_3_7
      environment: {
        LOG_LEVEL: '10', // Debug log level - https://docs.python.org/3/library/logging.html
        DB_HOST: instance.instanceEndpoint.hostname,
        DB_USERNAME: DB_USERNAME,
        DB_PASSWORD: DB_PASSWORD,
        DB_NAME: DB_NAME,
        DB_PORT: DB_PORT,
        SEND_EMAIL_LAMBDA: mailerLambda.functionName,
      },
      layers: [databaseLayer],
    });

    // Update problem lambda
    const updateProblemLambda = new lambda.Function(this, 'UpdateProblem', {
      code: lambda.Code.fromAsset(path.join('lambda', 'update_problem'), {
        bundling: {
          image: lambda.Runtime.PYTHON_3_9.bundlingImage,
          command: [
            'bash',
            '-c',
            'pip install -r requirements.txt -t /asset-output &&  rsync -av -O --progress . /asset-output --exclude-from=.dockerignore',
          ],
        },
      }),
      handler: 'index.handler', // Optional, defaults to 'handler'
      runtime: lambda.Runtime.PYTHON_3_9, // Optional, defaults to lambda.Runtime.PYTHON_3_7
      environment: {
        LOG_LEVEL: '10', // Debug log level - https://docs.python.org/3/library/logging.html
        DB_HOST: instance.instanceEndpoint.hostname,
        DB_USERNAME: DB_USERNAME,
        DB_PASSWORD: DB_PASSWORD,
        DB_NAME: DB_NAME,
        DB_PORT: DB_PORT,
        SEND_EMAIL_LAMBDA: mailerLambda.functionName,
      },
      layers: [databaseLayer],
    });

    // Insert init data lambda
    const insertInitDataLambda = new lambda.Function(this, 'InsertInitData', {
      code: lambda.Code.fromAsset(path.join('lambda', 'insert_init_data'), {
        bundling: {
          image: lambda.Runtime.PYTHON_3_9.bundlingImage,
          command: [
            'bash',
            '-c',
            'pip install -r requirements.txt -t /asset-output &&  rsync -av -O --progress . /asset-output --exclude-from=.dockerignore',
          ],
        },
      }),
      handler: 'index.handler', // Optional, defaults to 'handler'
      runtime: lambda.Runtime.PYTHON_3_9, // Optional, defaults to lambda.Runtime.PYTHON_3_7
      environment: {
        LOG_LEVEL: '10', // Debug log level - https://docs.python.org/3/library/logging.html
        DB_HOST: instance.instanceEndpoint.hostname,
        DB_USERNAME: DB_USERNAME,
        DB_PASSWORD: DB_PASSWORD,
        DB_NAME: DB_NAME,
        DB_PORT: DB_PORT,
      },
      layers: [databaseLayer],
    });

    // Get problem by id
    const getProblemByIdLambda = new lambda.Function(this, 'GetProblemById', {
      code: lambda.Code.fromAsset(path.join('lambda', 'get_problem_by_id'), {
        bundling: {
          image: lambda.Runtime.PYTHON_3_9.bundlingImage,
          command: [
            'bash',
            '-c',
            'pip install -r requirements.txt -t /asset-output &&  rsync -av -O --progress . /asset-output --exclude-from=.dockerignore',
          ],
        },
      }),
      handler: 'index.handler', // Optional, defaults to 'handler'
      runtime: lambda.Runtime.PYTHON_3_9, // Optional, defaults to lambda.Runtime.PYTHON_3_7
      environment: {
        LOG_LEVEL: '10', // Debug log level - https://docs.python.org/3/library/logging.html
        DB_HOST: instance.instanceEndpoint.hostname,
        DB_USERNAME: DB_USERNAME,
        DB_PASSWORD: DB_PASSWORD,
        DB_NAME: DB_NAME,
        DB_PORT: DB_PORT,
      },
      layers: [databaseLayer],
    });

    // Delete problem
    const deleteProblemLambda = new lambda.Function(this, 'DeleteProblem', {
      code: lambda.Code.fromAsset(path.join('lambda', 'delete_problem'), {
        bundling: {
          image: lambda.Runtime.PYTHON_3_9.bundlingImage,
          command: [
            'bash',
            '-c',
            'pip install -r requirements.txt -t /asset-output &&  rsync -av -O --progress . /asset-output --exclude-from=.dockerignore',
          ],
        },
      }),
      handler: 'index.handler', // Optional, defaults to 'handler'
      runtime: lambda.Runtime.PYTHON_3_9, // Optional, defaults to lambda.Runtime.PYTHON_3_7
      environment: {
        LOG_LEVEL: '10', // Debug log level - https://docs.python.org/3/library/logging.html
        DB_HOST: instance.instanceEndpoint.hostname,
        DB_USERNAME: DB_USERNAME,
        DB_PASSWORD: DB_PASSWORD,
        DB_NAME: DB_NAME,
        DB_PORT: DB_PORT,
      },
      layers: [databaseLayer],
    });

    // ------------------------------------------------------------ IAM Policies -----------------------------------------------------------------

    mailerLambda.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          'ses:SendEmail',
          'ses:SendRawEmail',
          'ses:SendTemplatedEmail',
        ],
        resources: ['*'],
      })
    );

    updateProblemLambda.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['lambda:InvokeFunction'],
        resources: [mailerLambda.functionArn],
      })
    );

    createProblemLambda.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['lambda:InvokeFunction'],
        resources: [mailerLambda.functionArn],
      })
    );

    // ------------------------------------------------------------ Lambda Integrations ----------------------------------------------------------

    const getProblemsLambdaIntegration = new LambdaIntegration(
      getProblemsLambda
    );
    const createProblemLambdaIntegration = new LambdaIntegration(
      createProblemLambda
    );
    const updateProblemLambdaIntegration = new LambdaIntegration(
      updateProblemLambda
    );
    const getProblemByIdLambdaIntegration = new LambdaIntegration(
      getProblemByIdLambda
    );
    const insertInitDataLambdaIntegration = new LambdaIntegration(
      insertInitDataLambda
    );
    const deleteProblemLambdaIntegration = new LambdaIntegration(
      deleteProblemLambda
    );

    // ------------------------------------------------------------ API Gateway -----------------------------------------------------------------

    // Create API Gateway resource
    const apiGateway = new RestApi(this, 'APSIBugTrackerAPI', {
      restApiName: 'APSI BugTracker',
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
      },
    });

    // Attach Lambda integration to API Gateway
    // path: /problems/{user}
    const problemsRoute = apiGateway.root.addResource('problems');
    const userRoute = problemsRoute.addResource('{user}')
    userRoute.addMethod('GET', getProblemsLambdaIntegration);
    userRoute.addMethod('PUT', createProblemLambdaIntegration);

    // path: /problems/{user}/{id}
    const problemRoute = userRoute.addResource('{id}');
    problemRoute.addMethod('GET', getProblemByIdLambdaIntegration);
    problemRoute.addMethod('POST', updateProblemLambdaIntegration);
    problemRoute.addMethod('DELETE', deleteProblemLambdaIntegration);

    // path: /init-data
    const initDataRoute = apiGateway.root.addResource('init-data');
    initDataRoute.addMethod('PUT', insertInitDataLambdaIntegration);
  }
}

