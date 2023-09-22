import { SparklesIcon } from "@heroicons/react/24/outline"
import Input from './Input'
import Post from "./Post"
import { db } from "../firebase"
import { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { AnimatePresence, motion } from "framer-motion"

export default function Feed() {

    const [posts,setPosts] = useState([]);
    
    useEffect(
        () =>
        
            onSnapshot(
                query(collection(db, "posts"), orderBy("timestamp","desc")), 
                (snapshot) =>{
                    setPosts(snapshot.docs);
                }
            ), 
        []
     );

    
  return (
    <div className="xl:ml-[315px] sm:ml-[73px] border-l border-r border-gray-200 xl:min-w-[590px] flex-grow max-w-xl">
        <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold cursor-pointer mt-1">Home</h2>
            <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
                <SparklesIcon className="h-5" />
            </div>
        </div>
        <Input />
        <AnimatePresence>
        {posts.map((post)=>(
            <motion.div key={post.id} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration: 2}}>
                <Post key={post.id} id={post.id} post={post} />
            </motion.div>
        ))}
        </AnimatePresence>
    </div>
  )
}
