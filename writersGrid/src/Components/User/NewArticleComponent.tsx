import React, { useState } from 'react';
import RichTextEditor from './RichTextEditor';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { newArticle } from '../../Api/article';
import { useNavigate } from 'react-router-dom';

const NewArticleComponent: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const navigate = useNavigate()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (title.trim().length < 3) {
                toast.error('Title should be atleast 3 characters !!')
                return;
            }
            const formData = new FormData()
            formData.append('title', title)
            formData.append('content', content)
            if (image) {
                formData.append('image', image)
            }
            const res = await newArticle(formData)
            console.log('res', res)
            if (res?.data.success) {
                toast.success('Successfully published...')
                navigate('/myArticles')
            } else if (!res?.data.success) {
                toast.error(res?.data.message)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setImage(selectedFile)
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center mt-10">
            <form className="w-full max-w-4xl" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-gray-100 rounded px-4 py-2 w-1/2 mb-4"
                    required
                />
                <div className='relative z-0 w-1/2 mb-5 group'>
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900"
                        htmlFor="file_input"
                    >
                        Upload profile picture
                    </label>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        id="file_input"
                        onChange={handleImage}
                        type="file"
                    />
                </div>
                <div className="h-96 mb-4 overflow-y-auto overflow-x-hidden">
                    <RichTextEditor style={{ height: '100%' }} value={content} onChange={setContent} />
                </div>
                <button
                    type="submit"
                    className="bg-green-900 text-white px-4 py-2 rounded m-5"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default NewArticleComponent;