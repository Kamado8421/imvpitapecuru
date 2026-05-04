'use client'
import BackgroundImage from '@/assets/background.png';
import ImvpWhiteLogo from '@/assets/imvp-white-logo.png'
import Image from 'next/image';
import { useRouter } from 'next/navigation';


export default function LandingPage() {
  const router = useRouter();
  return (
    <div
      className="h-screen bg-center bg-cover bg-no-repeat flex flex-col justify-between"
      style={{ backgroundImage: `url(${BackgroundImage.src})` }}
    >

      <div className='flex-1 px-5 text-white py-15 bg-black/50 flex flex-col justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Olá, Tesoureiro(a)</h1>
          <p className=' mt-2'>Pronto(a) para deixar seus relatórios ainda mais dinâmicos?</p>
        </div>

        <div className='flex flex-col items-center gap-5'>
          <Image
            src={ImvpWhiteLogo}
            alt='logo'
            width={200}
          />
          <a href='/login' className='bg-[#3b9b6e] text-center hover:bg-[#2d7754] cursor-pointer font-semibold bottom-20 w-full p-3 rounded-lg'>Acessar Conta</a>
        </div>

      </div>

      <footer className='text-white bottom-0 p-3 w-full bg-[#3b9b6e] flex items-center justify-center'>
        <span>App by <a href="https://www.instagram.com/luciano_mendesz9/" target='_blank' className='underline text-[14px] italic font-semibold hover:text-amber-200'>@luciano_mendesz9</a></span>
      </footer>
    </div>
  )
} 