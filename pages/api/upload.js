import { v2 as cloudinary } from 'cloudinary';
import { IncomingForm } from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    },
};

// Cloudinary config from environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const form = new IncomingForm({
        keepExtensions: true,
        maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(500).json({ error: 'Upload failed' });
        }

        const file = files.file?.[0] || files.file;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        try {
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(file.filepath || file.path, {
                folder: 'petit',
            });

            // Delete old image from Cloudinary if provided
            const oldUrl = fields.old_url?.[0] || fields.old_url;
            if (oldUrl && oldUrl.includes('cloudinary.com')) {
                // Extract public_id from Cloudinary URL
                const matches = oldUrl.match(/\/petit\/([^/.]+)/);
                if (matches && matches[1]) {
                    await cloudinary.uploader.destroy(`petit/${matches[1]}`).catch(console.error);
                }
            }

            return res.status(200).json({ url: result.secure_url });
        } catch (error) {
            console.error('Cloudinary upload error:', error);
            return res.status(500).json({ error: 'Upload failed' });
        }
    });
}
