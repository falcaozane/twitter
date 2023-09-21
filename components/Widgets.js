import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import News from "./News";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";



export default function Widgets({ newsResults, randomUsersResult}) {
  const [articleNum, setArticleNum] = useState(3);
  const [users, setUsers] = useState(3);

  return (
    <div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5">
        <div className="w-[90%] xl:w-[85%] sticky top-0 bg-white py-2 z-50">
            <div className="flex items-center p-3 rounded-full relative">
                <MagnifyingGlassIcon className="h-5 z-50 text-gray-500 font-bold" />
                <input type="text" placeholder="Search Twitter..." className="rounded-full absolute inset-0 pl-12 border-gray-200 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100" />
            </div>
        </div>

        <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[85%]">
          <h4 className="font-bold text-xl px-4"> What's happening</h4>

          <AnimatePresence>
          {newsResults.slice(0,articleNum).map((article) => (
            <motion.div key={article.title} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration: 1}}>
                <News key={article.title} article={article} />
            </motion.div>
          ))}
          </AnimatePresence>
          <div className="flex">
            <button onClick={()=> setArticleNum(articleNum + 3)} className="text-blue-300 pl-4 pb-3 hover:text-blue-500">show more</button>
             {
              articleNum > 3 && (
              <button
                onClick={() => setArticleNum(articleNum - 3)}
                className="text-blue-300 pl-4 pb-3 hover:text-blue-400 items-end ml-10"
              >
              Show less
              </button>
              )}
          </div>
        </div>

        <div className="sticky top-16 text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[85%]">
          <h4 className="font-bold text-xl px-4"> Who to follow</h4>
              <AnimatePresence>
              {
              randomUsersResult.slice(0,users).map((randomUser)=>(
                <motion.div className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 transition duration-500 ease-out" key={randomUser.login.username} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration: 1}}>
                    <img className="rounded-full" width="40" height="40" src={randomUser.picture.thumbnail} alt={randomUser.login.username} />
                    <div className="truncate ml-4 leading-5">
                      <h4 className="text-bold hover:underline text-[14px] truncate">{randomUser.login.username}</h4>
                      <h5 className="text-[13px] text-gray-500 truncate">{randomUser.name.first + " "+ randomUser.name.last}</h5>
                    </div>
                    <button className="ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold">Follow</button>
                </motion.div>
              ))
              }
              </AnimatePresence>
              <div className="flex">
                <button onClick={()=> setUsers(users + 3)} className="text-blue-300 pl-4 pb-3 hover:text-blue-500">show more</button>
                {
                  users > 3 && (
                <button
                  onClick={() => setUsers(users - 3)}
                  className="text-blue-300 pl-4 pb-3 hover:text-blue-400 items-end ml-10"
                >
                Show less
                </button>
              )}
              </div>
        </div>
    </div>
  )
}
