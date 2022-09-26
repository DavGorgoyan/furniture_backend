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

export const getCategoriesController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const data = await select(`categories`, '*');
        const arr = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].parent_id === null) {
                data[i].subcategories = []
                for (let j = 0; j < data.length; j++) {
                    if (data[j].parent_id === data[i].id) {
                        data[i].subcategories.push(data[j])
                    }
                }
                arr.push(data[i])
            }
        }

        result.data = { categories: arr }

    } catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
}

export const getFilteredFurnituresController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const { page = 1, rowsPerPage = 9 } = req.query;
        const query =
            "SELECT id, image FROM furniture " +
            "WHERE category_id IN (SELECT id FROM categories WHERE parent_id = ? UNION SELECT ? id) " +
            "LIMIT ?,?";
        const pageCountQuery =
            "SELECT CEIL(COUNT(id) / ?) AS pageCount FROM furniture " +
            "WHERE category_id IN (SELECT id FROM categories WHERE parent_id = ? UNION SELECT ? id) "

        const data = await exec(query, [req.params.id, req.params.id, (page - 1) * rowsPerPage, +rowsPerPage]);
        const [{ pageCount }] = await exec(pageCountQuery, [rowsPerPage, req.params.id, req.params.id, (page - 1) * rowsPerPage, +rowsPerPage]);
        result.data = { item: data, pageCount: +pageCount };

    } catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
}

export const getMenuInfoFurnitureController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const query =
            "SELECT id,title FROM categories " +
            "WHERE parent_id IS NULL;"

        const data = await exec(query);
        result.data = { item: data };

    } catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
}

export const getMenuNavigationCintroller = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const { page = 1, rowsPerPage = 10 } = req.query;
        const query =
            "SELECT * FROM furniture " +
            "WHERE category_id IN (SELECT id FROM categories WHERE parent_id = ? ) " +
            "LIMIT ?,?;";

        const data = await exec(query, [req.params.id, (page - 1) * rowsPerPage, +rowsPerPage]);
        result.data = { item: data };

    } catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
}