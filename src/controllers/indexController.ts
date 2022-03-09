import { Request, Response } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import { paramMissingError } from '../shared/constants';

export function indexController() {
    return async (req: Request, res: Response) => {
        const { string } = req.params as ParamsDictionary;

        if (!string) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }

        // generate map
        const result: any = {};
        for (let i=0; i<string.length; i++) {
            result[string[i]] = i;
        }

        return res.status(OK).json(result);
    };
}
