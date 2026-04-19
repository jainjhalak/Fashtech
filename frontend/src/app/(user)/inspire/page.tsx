"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

type Post = {
  id: string;
  userId: string;
  caption: string;
  imageUrl: string;
};

type Comment = {
  id: string;
  userId: string;
  postId: string;
  text: string;
};

// Inline SVGs
const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "#ce1c1c" : "none"}
    stroke="#ce1c1c"
    strokeWidth="2"
    className="w-4 h-4"
  >
    <path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 4.01 13.5 5.44C14.09 4.01 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 13.5 15 21 12 21Z" />
  </svg>
);

const CommentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="#ce1c1c"
    strokeWidth="2"
    viewBox="0 0 24 24"
    className="w-4 h-4"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export default function InspirePage() {
  const [posts] = useState<Post[]>([
    { id: "1", userId: "Alice", caption: "My punk boots outfit 🔥", imageUrl: "/boots.png" },
    { id: "2", userId: "Bob", caption: "Coquette vibes today 💖", imageUrl: "/jacket.png" },
    { id: "3", userId: "Charlie", caption: "Sci-fi inspired jacket ⚡", imageUrl: "/sci-fi.png" },
  ]);

  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [newComment, setNewComment] = useState<Record<string, string>>({});

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleComments = (postId: string) => {
    setComments(prev => ({
      ...prev,
      [postId]: prev[postId] || [
        { id: "c1", userId: "Tester", postId, text: "Looks great!" },
      ],
    }));
  };

  const handleAddComment = (postId: string) => {
    const text = newComment[postId];
    if (!text) return;
    const newC: Comment = { id: Date.now().toString(), userId: "You", postId, text };
    setComments(prev => ({ ...prev, [postId]: [...(prev[postId] || []), newC] }));
    setNewComment(prev => ({ ...prev, [postId]: "" }));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-mono flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-start p-3">
        <h1 className="text-2xl font-extrabold text-[#ce1c1c] text-center tracking-widest mb-3">
          INSPIREBOARD
        </h1>

        <div className="w-full max-w-md flex-1 space-y-3">
          {posts.map(post => (
            <div key={post.id} className="bg-black/40 border border-[#811b1b] rounded-lg shadow p-3 space-y-2">
              <div className="text-[10px] text-zinc-400">
                Posted by <span className="text-[#ce1c1c] font-bold">{post.userId}</span>
              </div>

              <div className="w-full aspect-[3/4] bg-zinc-900 rounded-md overflow-hidden">
                <img src={post.imageUrl} alt={post.caption} className="w-full h-full object-contain" />
              </div>

              <p className="text-xs">{post.caption}</p>

              <div className="flex gap-4 text-[10px] items-center">
                <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1">
                  <HeartIcon filled={!!likedPosts[post.id]} />
                  <span className="text-[#ce1c1c]">Like</span>
                </button>
                <button onClick={() => toggleComments(post.id)} className="flex items-center gap-1 text-[#ce1c1c]">
                  <CommentIcon />
                  <span>Comments</span>
                </button>
              </div>

              {comments[post.id] && (
                <div className="space-y-1 mt-1">
                  {comments[post.id].map(c => (
                    <p key={c.id} className="text-[10px] text-zinc-300">
                      <span className="font-bold text-[#ce1c1c]">{c.userId}:</span> {c.text}
                    </p>
                  ))}
                  <div className="flex gap-1">
                    <input
                      type="text"
                      value={newComment[post.id] || ""}
                      onChange={e => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                      className="flex-1 bg-zinc-800 text-white text-[10px] px-2 py-1 rounded"
                      placeholder="Add a comment..."
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="bg-[#ce1c1c] text-white text-[10px] px-2 py-1 rounded"
                    >
                      Post
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center py-1 text-[9px] text-zinc-500 border-t border-[#811b1b]">
        © 2025 FASHTECH — Inspireboard
      </footer>
    </div>
  );
}
