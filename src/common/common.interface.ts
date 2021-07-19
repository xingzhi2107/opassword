export interface SuccessRO {
  errcode: 0;
  errmsg: 'success';
}

export function buildSuccessRO(): SuccessRO {
  return {
    errcode: 0,
    errmsg: 'success',
  };
}

export interface BadRequestErrorRO {
  errcode: 400;
  errmsg: 'User input is not valid.';
  errors: any[];
}

export function buildBadRequestErrorRO(errors: any[]): BadRequestErrorRO {
  return {
    errcode: 400,
    errmsg: 'User input is not valid.',
    errors,
  };
}
