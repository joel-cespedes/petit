import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading editor...</p>,
});

import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ value, onChange, placeholder }) => {
    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link'],
            ['clean']
        ],
    }), []);

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'align',
        'link'
    ];

    return (
        <div className="rich-text-editor">
            <ReactQuill
                theme="snow"
                value={value || ''}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
            />
            <style jsx global>{`
                .rich-text-editor .ql-container {
                    font-family: 'Source Sans Pro', sans-serif;
                    font-size: 16px;
                    min-height: 150px;
                }
                .rich-text-editor .ql-editor {
                    font-family: 'Source Sans Pro', sans-serif;
                    min-height: 150px;
                }
                .rich-text-editor .ql-editor h1,
                .rich-text-editor .ql-editor h2,
                .rich-text-editor .ql-editor h3 {
                    font-family: 'Lato', sans-serif;
                }
                .rich-text-editor .ql-toolbar {
                    border-radius: 4px 4px 0 0;
                    background: #f9f9f9;
                }
                .rich-text-editor .ql-container {
                    border-radius: 0 0 4px 4px;
                }
            `}</style>
        </div>
    );
};

export default RichTextEditor;
