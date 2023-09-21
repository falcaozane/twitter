
import { CommentModal } from '@/components/CommentModal'
import { SparklesIcon } from "@heroicons/react/24/outline"
import Sidebar from '@/components/Sidebar'
import Widgets from '@/components/Widgets'
import Post from '@/components/Post'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import { Snapshot } from 'recoil'


const inter = Inter({ subsets: ['latin'] })

export default function PostPage({ newsResults, randomUsersResult }) {
    const router = useRouter();
    const { id } = router.query;
    const [post, setPost] = useState()

    useEffect(()=>onSnapshot(doc(db,"posts", id), (snapshot) => setPost(snapshot)),[db, id])

  return (
    <main className='flex min-h-screen  mx-auto'>
      {/* SideBar */}
      <Sidebar />

      {/* Feed */}
      <div className="xl:ml-[325px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
        <div className="flex  py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
            <div onClick={()=> router.push("/")} className='hoverEffect'>
                <ArrowLeftIcon className='h-4' />
            </div>
            <h2 className="text-lg sm:text-xl font-bold cursor-pointer mt-1">Tweet</h2>
            <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
                <SparklesIcon className="h-5" />
            </div>
        </div>
        <Post id={id} post={post} />   
    </div>

      {/* Widgets */}
      <Widgets newsResults={newsResults.articles} randomUsersResult={randomUsersResult.results}/>
      
      {/* Modals */}
      <CommentModal />
    </main>
  )
}


// https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json

export async function getServerSideProps() {
  // code

  const newsResults = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json").then(
    (res)=>res.json()
    );

  const randomUsersResult = await fetch("https://randomuser.me/api/?results=30&inc=name,login,picture").then(
    (res)=>res.json()
  );

  return {
    props: {
      newsResults,
      randomUsersResult
    },
  }
}
