import fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    },
};

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const form = new IncomingForm({
        uploadDir: UPLOAD_DIR,
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

        // Generate unique filename
        const ext = path.extname(file.originalFilename || file.name || '.jpg');
        const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`;
        const newPath = path.join(UPLOAD_DIR, uniqueName);

        // Rename file to unique name
        fs.renameSync(file.filepath || file.path, newPath);

        // Delete old image if provided
        const oldUrl = fields.old_url?.[0] || fields.old_url;
        if (oldUrl && oldUrl.startsWith('/uploads/')) {
            const oldFilename = oldUrl.replace('/uploads/', '');
            const oldPath = path.join(UPLOAD_DIR, oldFilename);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
                console.log(`Deleted old image: ${oldPath}`);
            }
        }

        return res.status(200).json({ url: `/uploads/${uniqueName}` });
    });
}
