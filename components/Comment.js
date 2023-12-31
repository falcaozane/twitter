import { EllipsisHorizontalIcon, ChatBubbleOvalLeftEllipsisIcon, TrashIcon, HeartIcon, ChartBarIcon, ShareIcon} from "@heroicons/react/24/outline"
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid"
import Moment from "react-moment";
import { useSession, signIn } from "next-auth/react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { useState, useEffect } from "react"

import { useRecoilState } from "recoil";
import { modalState, postIdState } from "@/atom/modalAtom";
import { useRouter } from "next/router";


export default function Comment({ comment, commentId, originalPostId }) {

  const {data: session} = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false)
  const [open, setOpen] = useRecoilState(modalState)
  const [postId, setPostId] = useRecoilState(postIdState)
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", originalPostId, "comments", commentId, "likes"),
      (snapshot)=>{
        setLikes(snapshot.docs)
      }
    )
  }, [db, originalPostId, commentId]);

  useEffect(() => {
    setHasLiked(likes.findIndex((like)=>like.id === session?.user.uid) !==-1);
  }, [likes])

  

  async function likeComment(){
    if(session){
      if(hasLiked){
        await deleteDoc(doc(db, "posts", originalPostId, "comments", commentId, "likes", session?.user.uid));
      }
      else{
        await setDoc(doc(db, "posts", originalPostId, "comments", commentId, "likes", session?.user.uid), {username: session.user.username});
      }
    }
    else{
      signIn();
    }
  }

  async function deleteComment(){
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteDoc(doc(db, "posts", originalPostId, "comments", commentId));
    }
  }


  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200 lg:pl-16 md:pl-1">
      {/* user image */}
      <img 
        className="h-10 w-10 cursor-pointer hover:brightness-95 border-2 hover:border-blue-400 lg:h-11 lg:w-11 rounded-full mr-2 lg:mr-4" 
        src={comment?.userImg} 
        alt="user-img" 
      />
      {/* right side */}
      <div className="flex-1">
        {/* header */}

        <div className="flex items-center justify-between">
            {/*post user-info */}
            <div className="flex items-center lg:space-x-5 space-x-1 whitespace-nowrap">
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{comment?.name}</h4>
              <span className="text-sm sm:text-[15px] hover:underline">@{comment?.username}</span>
              <span className="text-sm sm:text-[15px] ">
                  -<Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
              </span>
            </div>
            {/* dot icon */}
            <EllipsisHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>
          {/* post text */}
            <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">{comment?.comment}</p>
          {/* icons */}
          <div className="flex justify-between text-gray-500 p-1">
              <div className="flex items-center select-none">
                <ChatBubbleOvalLeftEllipsisIcon 
                  onClick={
                    ()=>{
                      if(!session){
                        signIn();
                      }
                      else{
                        setPostId(originalPostId);
                        setOpen(!open);
                      }
                    }
                  } 
                  className="h-9 w-9 hoverEffect p-2 hover:text-blue-500 hover:bg-sky-100" 
                />
              </div>
              {
                session?.user.uid === comment?.userId
                &&
                <TrashIcon onClick={deleteComment} className="h-9 w-9 hoverEffect p-2 hover:text-yellow-600 hover:bg-yellow-100" />
              }
              
              <div className="flex items-center">
                {
                  hasLiked? (<HeartIconFilled onClick={likeComment} className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100" />): (<HeartIcon onClick={likeComment} className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />)
                }
                {
                  likes.length >0 &&(
                    <span className={`${hasLiked && "text-red-600"} text-sm select-none`}>{likes.length}</span>
                  )
                }
              </div>
              <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-green-500 hover:bg-green-100" />
              <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          </div>
      </div>
    </div>
  )
}
