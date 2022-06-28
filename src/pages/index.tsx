import type { NextPage } from 'next'
import dynamic from "next/dynamic";
import { Suspense } from "react";

const CreateShortLinkForm = dynamic(() => import('@/components/CreteShortLinkForm'), {
  ssr: false,
});


const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <Suspense>
        <CreateShortLinkForm />
      </Suspense>
    </div>
  )
}

export default Home
