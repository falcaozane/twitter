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
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "@/atom/modalAtom";
import { useRouter } from "next/router";


export default function Post({ post, id }) {

  const {data: session} = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false)
  const [open, setOpen] = useRecoilState(modalState)
  const [postId, setPostId] = useRecoilState(postIdState)
  const [comments, setComments] = useState([])
  const router = useRouter();
  

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot)=>{
        setLikes(snapshot.docs)
      }
    )
  }, [db]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "comments"),
      (snapshot)=>{
        setComments(snapshot.docs)
      }
    )
  }, [db]);

  useEffect(() => {
    setHasLiked(likes.findIndex((like)=>like.id === session?.user.uid) !==-1);
  }, [likes])

  

  async function likePost(){
    if(session){
      if(hasLiked){
        await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid));
      }
      else{
        await setDoc(doc(db, "posts", id, "likes", session?.user.uid ), {username: session.user.username});
      }
    }
    else{
      signIn();
    }
  }

  async function deletePost(){
    if(window.confirm("Are you sure you want to delete it")){
      deleteDoc(doc(db, "posts", id));
      if(post.data().image){
        deleteObject(ref(storage, `posts/${id}/image`))
      }
      router.push("/")
    }
  }


  return (
    <div className="flex p-1 md:p-1.5 lg:p-3 cursor-pointer border-b border-gray-200">
      {/* user image */}
      <img 
        className="h-10 w-10 cursor-pointer hover:brightness-95 border-2 hover:border-blue-400 lg:h-11 lg:w-11 rounded-full mr-1 lg:mr-3" 
        src={post?.data()?.userImg} 
        alt="user-img" 
      />
      {/* right side */}
      <div className="flex-1">
        {/* header */}

        <div className="flex items-center justify-between">
            {/*post user-info */}
            <div className="flex items-center lg:space-x-4 space-x-2 whitespace-nowrap">
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{post?.data()?.name}</h4>
              <span className="text-sm sm:text-[15px]">@{post?.data()?.username}</span>
              <span className="text-sm sm:text-[15px] hover:underline">
                  -<Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
              </span>
            </div>
            {/* dot icon */}
            <EllipsisHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>
          {/* post text */}
            <p onClick={()=>router.push(`/posts/${id}`)} className="text-gray-800 text-[15px] sm:text-[16px] mb-2">{post?.data()?.text}</p>
          {/* post image */}
              <img onClick={()=>router.push(`/posts/${id}`)} className="rounded-2xl mr-2 select-none" src={post?.data()?.image}  />
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
                        setPostId(id);
                        setOpen(!open);
                      }
                    }
                  } 
                  className="h-9 w-9 hoverEffect p-2 hover:text-blue-500 hover:bg-sky-100" 
                />
                {comments.length >0 && (
                    <span className="text-sm">{comments.length}</span>
                )}
              </div>
              {
                session?.user.uid === post?.data()?.id
                &&
                <TrashIcon onClick={deletePost} className="h-9 w-9 hoverEffect p-2 hover:text-yellow-600 hover:bg-yellow-100" />
              }
              
              <div className="flex items-center">
                {
                  hasLiked? (<HeartIconFilled onClick={likePost} className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100" />): (<HeartIcon onClick={likePost} className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />)
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
