import axios from "axios";
import * as cheerio from "cheerio";
import { validateUrl } from "../utils/validateUrl.js";

export const auditWebsite = async (url) => {

    if (!validateUrl(url)) {
        throw new Error("Invalid URL");
    }

    try {

        const startTime = Date.now();

        const response = await axios.get(url, {
        timeout: 10000,

        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
        },

        validateStatus: () => true
    });

        const responseTime = Date.now() - startTime;

        // Handle HTTP errors
        if (response.status >= 400) {
            throw new Error(`Website returned status ${response.status}`);
        }

        // Check content type
        const contentType = response.headers["content-type"];

        if (!contentType || !contentType.includes("text/html")) {
            throw new Error("URL does not contain HTML content.");
        }

        const $ = cheerio.load(response.data);

        const title = $("title").text().trim() || "No title found";

        const description =
            $('meta[name="description"]').attr("content") ||
            "No description found";

        const h1 =
            $("h1").first().text().trim() ||
            "No H1 found";

        const images = $("img").length;

        const bodyText = $("body").text();

        const wordCount = bodyText
            .replace(/\s+/g, " ")
            .trim()
            .split(" ")
            .filter(word => word.length > 0).length;

        return {
            success: true,
            status: response.status,
            responseTime,
            title,
            description,
            h1,
            images,
            wordCount
        };

    } catch (error) {

        if (error.code === "ECONNABORTED") {
            throw new Error("Request timed out.");
        }

        if (
            error.code === "ENOTFOUND" ||
            error.code === "EAI_AGAIN"
        ) {
            throw new Error("Website could not be reached.");
        }

        throw error;
    }
};