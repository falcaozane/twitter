import { PhotoIcon, FaceSmileIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "firebase/firestore"
import { db, storage } from "../firebase"
import { useSession, signOut } from "next-auth/react"
import { useState,useRef } from "react"
import { getDownloadURL, ref , uploadString} from "firebase/storage"



export default function Input() {
    const {data: session} = useSession();
    const [input, setInput] = useState("");
    const [selectedFile,setSelectedFile] = useState(null);
    const [loading,setLoading] = useState(false)

    const filePickerRef = useRef(null)
    const sendPost = async()=>{

        if(loading) return;
        setLoading(true)
        
        const docRef = await addDoc(collection(db, "posts"), {
            id: session.user.uid,
            text: input,
            userImg: session.user.image,
            timestamp: serverTimestamp(),
            name: session.user.name,
            username:session.user.username,

        });

        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        if (selectedFile){
            await uploadString(imageRef, selectedFile, "data_url").then(async ()=>{
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(doc(db,"posts", docRef.id),{
                    image: downloadURL,
                })
            })
        }

        setInput("");
        setSelectedFile(null);
        setLoading(false);
    };

    const addImageToPost = (e)=>{
        const reader = new FileReader();

        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent)=>{
            setSelectedFile(readerEvent.target.result);
        };
    }

    return (
        <>
            {
            session && (

                <div className="flex border-b border-gray-200 p-3 space-x-3">
                    <img 
                        src={session.user.image} 
                        alt="user" 
                        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95 border-2 hover:border-blue-400"
                        onClick={signOut} 
                        />
                    <div className="w-full">
                        <div className="">
                            <textarea 
                                className="w-full border-gray-100 focus:ring-0 rounded-xl text-lg placeholder-gray-500 tracking-wide min-h-[50px] text-gray-700" 
                                name="" id="" rows="3"  
                                placeholder="What's happening?"
                                value={input}
                                onChange={(e)=>setInput(e.target.value)}
                            >
                            </textarea>
                        </div>
                        {selectedFile && (
                            <div className="relative">
                                <XMarkIcon onClick={()=>setSelectedFile(null)} className="m-4 h-8 w-8 font-bold bg-white text-red-700 absolute rounded-full border-1 hover:bg-red-600 hover:text-white hover:border-red-500 hover:border-2 shadow-md shadow-slate-500" />
                                <img src={selectedFile} alt="selectedfile" className={`rounded-2xl && ${loading && "animate-pulse"}`} />
                            </div>
                        )}
                    <div className="flex items-center justify-between pt-2.5">
                        {!loading && (
                            <>
                                <div className="flex ">
                                    <div onClick={() => filePickerRef.current.click()}>
                                        <PhotoIcon className=" cursor-pointer hoverEffect p-2 h-10 w-10 text-sky-500 hover:bg-sky-100" />
                                        <input type="file" hidden ref={filePickerRef} onChange={addImageToPost}/>
                                    </div>
                                    <FaceSmileIcon className=' cursor-pointer hoverEffect p-2 h-10 w-10 text-sky-500 hover:bg-sky-100' />
                                </div>
                                <button onClick={sendPost} disabled={!input.trim()} className="bg-blue-400 text-white rounded-full px-4 py-1.5 hover:brightness-95 shadow-md font-bold disabled:opacity-50" >
                                    Tweet
                                </button>
                            </>
                        )}

                    </div>
                    </div>  
                </div>

            )
        }
        </>
        
  )
}
