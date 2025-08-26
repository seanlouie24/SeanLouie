import type { Request } from 'express';
import type { ParamsDictionary, Query } from 'express-serve-static-core';
import type { components, operations } from './openapi';

export type ServiceReturnType<T extends keyof operations & string> =
    | {
        data: operations[T]['responses'][200]['content']['application/json'];
        error?: undefined;
    }
    | {
        data?: undefined;
        error: components['schemas']['Problem'];
    };

export type ServiceReturnTypeV2<T extends keyof operations & string> =
    | {
        success: true;
        data: operations[T]['responses'][200]['content']['application/json'];
    }
    | {
        success: false;
        error: components['schemas']['Problem'];
    };

type NonUndefined<T> = T extends undefined ? never : T;

export type OperationsRequest<T extends keyof operations & string> = Request<
operations[T] extends { parameters: { path: any } }
    ? operations[T]['parameters']['path']
    : ParamsDictionary,
any,
operations[T] extends {
    requestBody: { content: { 'application/json': any } };
}
    ? operations[T]['requestBody']['content']['application/json']
    : any,
operations[T] extends {
    parameters: {
        query?: Record<string, any>;
    };
}
    ? NonUndefined<operations[T]['parameters']['query']>
    : Query
>;
