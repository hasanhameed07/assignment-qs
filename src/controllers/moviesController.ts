import { Request, Response } from 'express';
import { BAD_REQUEST, BAD_GATEWAY, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import { paramMissingError, moviesServerDownError } from '../shared/constants';
import _ from 'lodash';
import axios from 'axios';
import Movie from '../interfaces/Movie.interface';

export function moviesController() {
    return async (req: Request, res: Response) => {
        const { title } = req.params as ParamsDictionary;
        if (!title) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        try {
            // get the first page
            const response = await fetchPage(title, 1);
            const totalPages: number =response.total_pages;
            let result: Movie[] = response.data;
            // get other pages and merge
            for (let p=2; p<=totalPages; p++) {
                let resultPaged = await fetchPage(title, p);
                _.merge(result, resultPaged.data);
            }
            // sort results
            result = _.sortBy(result, [(o) => (o.Title)]);
            // return
            return res.status(OK).json(result);
        }
        catch (error) {
            console.log(moviesServerDownError);
            return res.status(BAD_GATEWAY).json({
                error: moviesServerDownError,
            });
        }
    };
}

async function  fetchPage(title: string, page: number) {
    const result = await axios.get(process.env.MOVIESDB_URL + '?Title=' + title + '&page='+page );
    return result.data;
}