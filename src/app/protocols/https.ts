export namespace Http {
  export interface Request<
    Body = any,
    Params = any,
    Query = any,
    Headers = any
  > {
    body: Body;
    params: Params;
    query: Query;
    headers: Headers;
  }

  export interface Response<Body = unknown> {
    statusCode: number;
    body?: Body;
  }
}
