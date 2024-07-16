import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { findArticleById } from "../../Api/article";
import RichTextEditor from "./RichTextEditor";

interface Article {
  id: string;
  title: string;
  content: string;
  image: string;
  creationTime: Date;
}

const EditArticleComponent = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { id } = useParams<{ id: string }>();

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Prepare form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Handle form submission logic, such as sending data to the server
    try {
      // Example: Send formData to your API endpoint for updating the article
      console.log("Form Data:", formData);
      // Implement your API call to update the article here
    } catch (error) {
      console.error("Error updating article:", error);
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
        <div className="h-96 mb-4 overflow-y-auto overflow-x-hidden">
          <RichTextEditor style={{ height: "100%" }} value={content} onChange={setContent} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {image && (
          <img
            src={image}
            alt="Selected"
            className="max-w-full h-auto mb-4 rounded-lg shadow-lg"
            style={{ maxHeight: "300px" }}
          />
        )}
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