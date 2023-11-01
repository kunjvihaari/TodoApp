// const Home = () => {
//   return <h1 className="text-green-500">Home</h1>;
// };

// export default Home;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import customAxios from "../utils/axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { loggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loggedIn) {
      // Fetch posts when the user is logged in
      fetchPosts();
    } else {
      // Handle the case when the user is not logged in
      setPosts([]);
      setIsLoading(false);
    }
  }, [loggedIn]);

  const fetchPosts = async () => {
    try {
      const response = await customAxios.get("/post"); // Replace with your API endpoint
      setPosts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full sm:w-3/4 py-2 px-3 sm:py-5 sm:px-0">
      <h2 className="text-4xl font-extrabold my-3">Home</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <div key={post.id} className="border border-gray-900/10 p-4">
              <h3 className="text-2xl font-semibold">{post.title}</h3>
              <p className="text-gray-600">{post.description}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="mt-4 max-w-full h-auto"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
