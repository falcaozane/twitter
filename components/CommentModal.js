import { use, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import {modalState, postIdState} from "../atom/modalAtom"
import Modal from 'react-modal'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { onSnapshot, doc, addDoc, serverTimestamp, collection} from 'firebase/firestore'
import { db } from "../firebase";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router'


export const CommentModal = () => {
    const [open, setOpen] = useRecoilState(modalState);
    const [postId] = useRecoilState(postIdState);
    const [post, setPost] = useState({})
    const [input, setInput] = useState("");
    const {data: session} = useSession();
    const router = useRouter();

    useEffect(()=>{
        onSnapshot(doc(db, "posts", postId), (snapshot)=>{
            setPost(snapshot)
        })
    },[postId, db])

    

    async function sendComment(){
        await addDoc(collection(db, "posts", postId, "comments"),{
            comment: input,
            name: session.user.name,
            username: session.user.username,
            userImg: session.user.image,
            timestamp: serverTimestamp(),
        })

        setOpen(false);
        setInput("");
        router.push(`/posts/${postId}`)
    }

  return (
    <div>
        {open && (
            <Modal isOpen={open} onRequestClose={()=>setOpen(false)} className="max-w-lg w-[90%]  absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-400 rounded-xl shadow-md">
                <div className='p-1'>
                    <div className='border-b border-gray-200 py-2 px-1.5'>
                        <div onClick={()=>setOpen(false)} className='hoverEffect w-10 h-10 flex items-center justify-center p-1'>
                            <XMarkIcon className='h-[22px] text-gray-700' />
                        </div>
                    </div>
                    <div className='p-2 flex items-center space-x-1 relative'>
                        <span className='w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300' />
                        <img className="h-10 w-10 cursor-pointer hover:brightness-95 border-2 hover:border-blue-400 lg:h-11 lg:w-11 rounded-full mr-2 lg:mr-4" src={post?.data()?.userImg} alt="user-img" />
                        <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{post?.data()?.name}</h4>
                        <span className="text-sm sm:text-[15px]">@{post?.data()?.username} - </span>
                        <span className="text-sm sm:text-[15px] hover:underline">
                            <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
                        </span>
                    </div>
                    <p className='text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2 px-2'>{post?.data()?.text}</p>
                <div className="flex p-3 space-x-3">
                    <img 
                        src={session.user.image} 
                        alt="user" 
                        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95 border-2 hover:border-blue-400"
                         
                        />
                    <div className="w-full">
                        <div className="">
                            <textarea 
                                className="w-full border-gray-100 focus:ring-0 rounded-xl text-lg placeholder-gray-500 tracking-wide min-h-[50px] text-gray-700" 
                                name="" id="" rows="3"  
                                placeholder="Reply"
                                value={input}
                                onChange={(e)=>setInput(e.target.value)}
                            >
                            </textarea>
                        </div>
                        
                    <div className="flex items-center justify-between pt-2.5">
                        <div className="flex ">
                                    
                        </div>
                        <button onClick={sendComment} disabled={!input.trim()} className="bg-blue-400 text-white rounded-full px-4 py-1.5 hover:brightness-95 shadow-md font-bold disabled:opacity-50" >
                            Reply
                        </button>
                    </div>
                    </div>  
                </div>
                </div>
            </Modal>
        )}
    </div>
  )
}
