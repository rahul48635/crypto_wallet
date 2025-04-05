import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { blogs } from "../constants";
import { motion } from "framer-motion";

type Blog = {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
};

const BlogPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="p-8 max-w-7xl min-h-screen mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="montserrat-1 text-4xl font-bold mb-6 text-center text-blue-600 underline w-full">
        Latest Blogs
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {blogs.map((blog: Blog) => (
          <motion.div
            key={blog.id}
            className="bg-gray-100 p-6 rounded-lg shadow-lg transform hover:scale-95 transition-all duration-500 ease-in-out neumorphism"
          >
            <Link
              to={`/blogs/${blog.id}`}
              className="text-xl font-semibold text-blue-700 hover:text-yellow-950"
            >
              <h2 className="montserrat-1">{blog.title}</h2>
              <p className="poppins-light text-gray-700 mt-2">
                {blog.excerpt}
              </p>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <span>By {blog.author}</span>
                <span>{blog.date}</span>
                <FaPen className="text-gray-600" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BlogPage;
