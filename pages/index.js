
import { CommentModal } from '@/components/CommentModal'
import Feed from '@/components/Feed'
import Sidebar from '@/components/Sidebar'
import Widgets from '@/components/Widgets'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home({ newsResults, randomUsersResult }) {
  return (
    <main className='flex min-h-screen  mx-auto'>
      {/* SideBar */}
      <Sidebar />

      {/* Feed */}
      <Feed />

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
