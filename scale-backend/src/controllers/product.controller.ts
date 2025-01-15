import AWS from "aws-sdk"
import express, {Response , Request} from "express"

const s3 = new AWS.S3({
    accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
    secretAccessKey: process.env.AMAZON_ACCESS_SECRET,
    region : "ap-south-1"
})

export const getPresignedUrls = async (req : Request, res : Response) : Promise<any> => {
    const { fileTypes } = req.body; // Expecting an array of file types

    if (!Array.isArray(fileTypes) || fileTypes.length === 0) {
        return res.status(400).json({ message: "Invalid fileTypes format" });
    }

    const urls = [];

    try {
        for (const fileType of fileTypes) {
            const key = `products/${Date.now()}-${Math.random()
                .toString(36)
                .substring(7)}`;
            
            const s3Params = {
                Bucket: "econsappbucket", // Replace with your bucket name
                Key: key,
                Expires: 60 * 10, // URL expiry time in seconds
                ContentType: fileType,
                ACL: "public-read",
            };

            const presignedUrl = await s3.getSignedUrlPromise("putObject", s3Params);

            urls.push({ presignedUrl, key });
        }

        res.status(200).json({ urls });
    } catch (error) {
        console.error("Error generating pre-signed URLs:", error);
        res.status(500).json({ message: "Failed to generate pre-signed URLs" });
    }
};