import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { findArticleById, editArticle } from "../../Api/article";
import RichTextEditor from "./RichTextEditor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const EditArticleComponent = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (id) {
          const res = await findArticleById(id);
          if (res?.data.success) {
            setTitle(res.data.data.title);
            setContent(res.data.data.content);
            setImage(res.data.data.image);
          }
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [id]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImage(selectedFile)
    }
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      if (title.trim().length < 3) {
        toast.error('Title should have more than 3 characters !!');
        return;
      } else if (content.trim().length < 5) {
        toast.error('Please enter valid article !!!');
        return;
      }
      const formData = new FormData()
      if (id) {
        formData.append('id', id)
      }
      formData.append('title', title)
      formData.append('content', content)
      if (image) {
        formData.append('image', image)
      }
      const res = await editArticle(formData)
      console.log(res)
      if (res?.data.success) {
        toast.success('Successfully edited...')
        navigate('/myArticles')
      } else if (!res?.data.success) {
        toast.error(res?.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center mt-10">
      <form className="w-full max-w-4xl" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-100 rounded px-4 py-2 w-full mb-4"
          required
        />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="h-96 mb-4 overflow-y-auto overflow-x-hidden">
          <RichTextEditor style={{ height: "100%" }} value={content} onChange={setContent} />
        </div>

        <button
          type="submit"
          className="bg-green-900 text-white px-4 py-2 rounded m-5"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditArticleComponent;