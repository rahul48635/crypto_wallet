import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogs } from "../constants"; 
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

type Blog = {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  content: string;
};

const BlogPreview: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const navigate = useNavigate();

  const blog = blogs.find((b: Blog) => b.id === parseInt(blogId || "", 10));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!blog) {
    return (
      <p className="text-center text-xl text-red-500">Blog not found!</p>
    );
  }

  return (
    <motion.div
      className="mx-auto p-6 bg-gray-100 rounded-lg shadow-lg neumorphism w-full  px-[10vw]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <button
        onClick={() => navigate("/blogs")}
        className="text-blue-700 mb-6 flex items-center space-x-2 hover:text-yellow-400 transition-all duration-300"
      >
        <FaArrowLeft />
        <span>Back to Blogs</span>
      </button>

      <h1 className="montserrat-1 text-4xl font-bold text-blue-700">
        {blog.title}
      </h1>
      <p className="poppins-light text-blue-500 text-lg mt-2 ">
        <strong>By {blog.author}</strong> | {blog.date}
      </p>

      <div className="mt-6 text-gray-500 text-lg leading-relaxed">
        <p className="poppins-light">{blog.content}</p>
      </div>
    </motion.div>
  );
};

export default BlogPreview;
