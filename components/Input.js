import { PhotoIcon, FaceSmileIcon } from "@heroicons/react/24/outline"

export default function Input() {
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3">
        <img src="" alt="user" className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95 border-2 hover:border-blue-400" />
        <div className="w-full">
            <div className="">
                <textarea className="w-full border-gray-100 focus:ring-0 rounded-xl text-lg placeholder-gray-500 tracking-wide min-h-[50px] text-gray-700" name="" id="" rows="3"  placeholder="What's happening?"></textarea>
            </div>
            <div className="flex items-center justify-between pt-2.5">
                <div className="flex ">
                    <PhotoIcon className=" cursor-pointer hoverEffect p-2 h-10 w-10 text-sky-500 hover:bg-sky-100" />
                    <FaceSmileIcon className=' cursor-pointer hoverEffect p-2 h-10 w-10 text-sky-500 hover:bg-sky-100' />
                </div>
                <button className="bg-blue-400 text-white rounded-full px-4 py-1.5 hover:brightness-95 shadow-md font-bold disabled:opacity-50" disabled>Tweet</button>
            </div>
        </div>
    </div>
  )
}
