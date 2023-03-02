import { GenericTable } from './GenericTable';

import {Stack, StackProps} from 'aws-cdk-lib'
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import {  join } from 'path';

export class SpaceStack extends Stack {

    private api = new RestApi(this, 'SpaceAPI');
    private staceTable = new GenericTable('SpaceTable', 'spaceId', this)

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        const helloLambda = new Function(this, 'HelloLambda', {
            runtime: Runtime.NODEJS_18_X,
            code: Code.fromAsset(join(__dirname, '..', 'services','hello')),
            handler: 'hello.main'
        })

        const helloLambdaIntergration = new LambdaIntegration(helloLambda);
        const helloLambdaResource = this.api.root.addResource('hello');
        helloLambdaResource.addMethod('GET', helloLambdaIntergration);
    }
}