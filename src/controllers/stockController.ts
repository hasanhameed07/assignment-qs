import { Request, Response } from 'express';
import { BAD_REQUEST, BAD_GATEWAY, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import { paramMissingError, stockserverDownError } from '../shared/constants';
import _ from 'lodash';
import axios from 'axios';
import StockResponse from '../interfaces/StockReponse.interface';
import moment from 'moment';

export function stockController() {
    return async (req: Request, res: Response) => {
        const { date } = req.params as ParamsDictionary;
        const dateMoment = moment(date, 'D-MMMM-YYYY');

        // check if date is valid
        if (!dateMoment.isValid()) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        try {
            const response = await axios.get(process.env.STOCK_URL + '?date=' + dateMoment.format('D-MMMM-YYYY').toString());
            let result: StockResponse;
            // pick required values only
            if (response.data && response.data.data) {
                result = _.pick(response.data.data[0], ['open', 'close', 'high', 'low']);
                return res.status(OK).json(result);
            }
            else {
                // if no data, we can show error may be
                throw Error();
            }
        }
        catch (error) {
            console.log(stockserverDownError);
            return res.status(BAD_GATEWAY).json({
                error: stockserverDownError,
            });
        }
    };
}
