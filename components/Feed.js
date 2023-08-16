import { SparklesIcon } from "@heroicons/react/24/outline"
import Input from './Input'
import Post from "./Post"

export default function Feed() {
    const posts = [
        {
            id:1,
            name: "Zane Falcao",
            username: "falcaozane",
            userImg: "https://images.pexels.com/photos/17588450/pexels-photo-17588450/free-photo-of-hidden.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            img: "https://images.pexels.com/photos/17044199/pexels-photo-17044199/free-photo-of-kids-looking-through-a-tire-swing.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            text: "Nice",
            timestamp: "2 hrs ago"
        },
        {
            id:2,
            name: "Zhane Falcao",
            username: "falcaozhane",
            userImg: "https://images.pexels.com/photos/17044199/pexels-photo-17044199/free-photo-of-kids-looking-through-a-tire-swing.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            img: "https://images.unsplash.com/photo-1649328573624-1aa3bdddf13f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
            text: "Good",
            timestamp: "3 hrs ago"
        },
        {
            id:3,
            name: "Zayn Falcao",
            username: "falcaozayn",
            img: "https://images.pexels.com/photos/17044199/pexels-photo-17044199/free-photo-of-kids-looking-through-a-tire-swing.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            userImg: "https://images.unsplash.com/photo-1649328573624-1aa3bdddf13f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
            text: "Good",
            timestamp: "3 hrs ago"
        },
    ]
  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
        <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold cursor-pointer mt-1">Home</h2>
            <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
                <SparklesIcon className="h-5" />
            </div>
        </div>
        <Input />
        {posts.map((post)=>(
            <Post key={post.id} post={post} />
        ))}
    </div>
  )
}
