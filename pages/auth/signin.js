import { getProviders, signIn } from "next-auth/react";
import Twitter from '../../public/assets/twitter.png';
import Image from "next/image";

export default function signin({ providers }) {
  return (
    <div className="flex justify-center mt-24 space-x-5">
      <img className="hidden object-cover w-96 h-80 md:inline-flex" src="https://oyelabs.com/wp-content/uploads/2023/01/Group-54701.png" alt="twitter-loginpage-img" />

      <div className="">
        {Object.values(providers).map((provider) => (
          <div className="flex flex-col items-center" key={provider.name}>
            <Image className="w-36 h-36 object-cover" src={Twitter} alt="twitter-png" />
            <p className="text-center text-sm italic my-10">This app is created for learning purposes</p>
            <button onClick={() => signIn(provider.id, { callbackUrl:"/"})} className="bg-blue-500 rounded-full p-3 text-white hover:bg-blue-600">
                Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  
    const providers = await getProviders();
    return {
      props: {
        providers,
      },
    };
  
}
