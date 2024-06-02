import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  db,
  getDocs,
  onSnapshot,
  query,
  doc,
  deleteDoc,
  updateDoc,
  orderBy,
  serverTimestamp,
  auth,
  signOut,
} from "../firebase/firebaseConfig";

const Profile = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editPost, setEditPost] = useState({
    editId: null,
    editText: "",
  });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const getAllPosts = await getDocs(collection(db, "posts"));
      getAllPosts.forEach((doc) => {
        setAllPosts((prev) => {
          const newData = [...prev, doc.data()];
          return newData;
        });
      });
    };
    getData();

    let unsubscribe = null;
    const getRealTimeData = () => {
      const q = query(collection(db, "posts"), orderBy("createdOn", "desc"));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ id: doc.id, ...doc.data() });
        });

        setAllPosts(posts);
        console.log("posts :", posts);
      });
    };
    getRealTimeData();

    return () => {
      console.log("cleanup function");
      unsubscribe();
    };
  }, []);

  const createPostHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const createPost = await addDoc(collection(db, "posts"), {
        text: post,
        // createdOn: new Date().getTime(),
        createdOn: serverTimestamp(),
      });
      e.target.reset();
      setIsLoading(false);
      console.log("Document written with ID: ", createPost.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      setIsLoading(false);
    }
  };

  const deleteHandler = async (postId) => {
    await deleteDoc(doc(db, "posts", postId));
  };

  const updatePostHandler = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "posts", editPost.editId), {
        text: editPost.editText,
      });
      setEditPost({
        editId: null,
        editText: "",
      });
    } catch (error) {
      console.log("error->", error.message);
    }
  };

  // <p className="text-xl">Welcome, {auth.currentUser.displayName}</p>

  return (
    <div>
      <form onSubmit={createPostHandler}>
        <div className="bg-white shadow p-4 my-6 mx-auto rounded-md w-1/2 flex gap-3">
          <input
            type="text"
            name="text"
            required
            className="w-full focus ps-3"
            placeholder="Enter a post...."
            onChange={(e) => setPost(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#a2d2ff] text-xl py-2 px-5 text-white rounded-md"
          >
            Post
          </button>
        </div>
      </form>

      <div className="flex flex-wrap justify-center gap-x-20 gap-y-4">
        {allPosts.length === 0 && (
          <div className="text-2xl">Add New Post...</div>
        )}
        {allPosts.map((eachPost, idx) => {
          return (
            <div
              key={idx}
              className=" w-1/4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-white "
            >
              <p className="mb-3 text-center text-xl py-10 text-gray-700 dark:text-gray-700">
                {eachPost.id === editPost.editId ? (
                  <textarea
                    type="text"
                    value={editPost?.editText}
                    placeholder="Enter updated value.."
                    className="bg-[#f1faee]"
                    onChange={(e) => {
                      setEditPost({
                        ...editPost,
                        editText: e.target.value,
                      });
                    }}
                  />
                ) : (
                  eachPost?.text
                )}
              </p>
              <div className="flex gap-3 justify-center">
                {editPost.editId === eachPost?.id ? (
                  <button
                    className="px-5 py-2 font-medium text-center text-white bg-[#] rounded-lg hover:bg-[#3cadc4] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-[#00b4d8] dark:hover:bg-[#269bb3] dark:focus:ring-blue-800"
                    onClick={updatePostHandler}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="px-5 py-2 font-medium text-center text-white bg-[#] rounded-lg hover:bg-[#3cadc4] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-[#00b4d8] dark:hover:bg-[#269bb3] dark:focus:ring-blue-800"
                    onClick={() => {
                      setEditPost({
                        editId: eachPost?.id,
                        editText: eachPost?.text,
                      });
                    }}
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => deleteHandler(eachPost?.id)}
                  className="px-3 py-2 font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-[#ef233c] dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
