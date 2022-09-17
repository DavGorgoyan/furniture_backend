import { getResponseTemplate } from "../lib/index.js"
import { exec, select } from "../providers/db/operations.js";

export const getSliderImagesController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const query =
            "SELECT f.`id`,f.`image` FROM furniture f " +
            "LEFT JOIN categories c ON f.`category_id` = c.`id` " +
            "WHERE c.`parent_id` IS NOT NULL " +
            "ORDER BY RAND() " +
            "LIMIT 9;"

        const data = await exec(query)
        result.data = { items: data }

    } catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);

}

export const getRandomFurnitureInAboutController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const query =
            "SELECT id,image FROM furniture " +
            "ORDER BY RAND() " +
            "LIMIT 3; ";

        const data = await exec(query);
        result.data = { items: data };

    } catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
}

export const getAllFurnitureController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const { page = 1, rowsPerPage = 8 } = req.query;
        const query =
            "SELECT id,image FROM furniture " +
            "LIMIT ?,?";

        const data = await exec(query, [(page - 1) * rowsPerPage, +rowsPerPage]);
        result.data = { items: data };

    } catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
}

export const getRandomFurnitureController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const query =
            "SELECT id,image FROM furniture " +
            "ORDER BY RAND() " +
            "LIMIT 3; ";

        const data = await exec(query);
        result.data = { items: data };

    } catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
}

export const getFilteredFurnitureController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const { page = 1, rowsPerPage = 8 } = req.query;
        const query = "SELECT id,image FROM furniture " +
            "WHERE category_id = ? " +
            "LIMIT ?,?; ";

        const data = await exec(query, [req.params.id, (page - 1) * rowsPerPage, +rowsPerPage]);
        result.data = { items: data };

    } catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
}