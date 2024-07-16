import React, { CSSProperties } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ],
};

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
];

interface RichTextEditorProps {
    style?: CSSProperties;
    value: string;
    onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ style, value, onChange }) => {
    return (
        <div style={style}>
            <ReactQuill theme="snow" value={value} onChange={onChange} modules={modules} formats={formats} />
        </div>
    );
}

export default RichTextEditor;