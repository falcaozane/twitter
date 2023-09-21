import Image from 'next/image'
import SidebarMenuItem from './SidebarMenuItem'
import Twitter from '../public/assets/twitter.png'
import {HomeIcon, HashtagIcon} from '@heroicons/react/24/solid'
import {BellIcon, InboxIcon, BookmarkIcon, ClipboardIcon, UserIcon, EllipsisHorizontalCircleIcon, EllipsisHorizontalIcon} from '@heroicons/react/24/outline'
import { useSession, signIn, signOut } from 'next-auth/react'
export default function Sidebar() {
  const {data: session} = useSession();
  return (
    <div className='hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-16'>
        {/* LOGO */}
        <div className='hoverEffect p-0 hover:bg-blue-100 xl:p-2'>
            <Image src={Twitter} height={50} width={50}></Image>
        </div>

        {/* MENU */}
        <div className='mt-1 mb-1.5 xl:items-start'>
            <SidebarMenuItem text="Home" Icon={HomeIcon} active/>
            <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
            {session && (
              <>
                <SidebarMenuItem text="Notifications" Icon={BellIcon} />
                <SidebarMenuItem text="Messages" Icon={InboxIcon} />
                <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
                <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
                <SidebarMenuItem text="Profile" Icon={UserIcon} />
                <SidebarMenuItem text="More" Icon={EllipsisHorizontalCircleIcon} />
              </>
            )}
            
        </div>

        {/* BUTTON */}
        { session ? (
            <>
              <button className='bg-blue-400 rounded-full text-white w-52 h-12 font-bold text-lg shadow-md hover:brightness-95 hidden xl:inline text-center p-2 '>Tweet</button>
              {/* MINI PROFILE */}
              <div className='hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto'>
                <img onClick={signOut} src={session.user.image} alt='user-img' className='h-10 w-10 rounded-full xl:mr-2' />
                <div className='leading-5 hidden xl:inline'>
                <h4 className='font-bold'>{session.user.name}</h4>
                <p className='text-gray-500'>@{session.user.username}</p>
                </div>
                <EllipsisHorizontalIcon className='h-5 xl:ml-8 hidden xl:inline' />
              </div>
            </>
        ): (
          <button onClick={signIn} className='bg-blue-400 rounded-full text-white w-56 h-12 font-bold text-lg shadow-md hover:brightness-95 hidden xl:inline text-center p-2'>Sign in</button>
        ) }
        
    </div>
  )
}
