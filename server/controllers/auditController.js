import { auditWebsite } from "../services/auditService.js";

export const auditPage = async (req, res) => {
    try {
        const { url } = req.body;

        const result = await auditWebsite(url);

        res.status(200).json(result);

    } catch (error) {

        let statusCode = 500;

        if (
            error.message === "Invalid URL" ||
            error.message === "URL does not contain HTML content."
        ) {
            statusCode = 400;
        } else if (error.message.startsWith("Website returned status")) {
            statusCode = 404;
        } else if (error.message === "Request timed out.") {
            statusCode = 408;
        }

        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};