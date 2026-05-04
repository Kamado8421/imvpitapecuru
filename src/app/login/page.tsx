// 'use client'

// import BackgroundImage from '@/assets/background.png';
// import ImvpWhiteLogo from '@/assets/imvp-white-logo.png'
// import Image from 'next/image';
// import { z } from 'zod';
// import { useState } from 'react';
// import { toast } from 'sonner';
// import { useRouter } from 'next/navigation';

// const loginSchema = z.object({
//     email: z.string().email('E-mail inválido'),
//     password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
// });


// export default function LoginPage() {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);

//     const router = useRouter();

//     async function signIn(e: React.FormEvent) {
//         e.preventDefault();

//         const result = loginSchema.safeParse({ email, password });

//         if (!result.success) {
//             toast.error('Preencha o formulário corretamente');

//             if (password.length < 6) {
//                 toast.error('A senha deve ter no mínimo 6 caracteres');
//             }

//             return;
//         }

//         try {
//             setLoading(true);

//             const response = await fetch('/api/auth/sign-in', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email,
//                     password,
//                 }),
//             });

//             if (response.status === 200) {
//                 toast.success('Login realizado com sucesso!');
//                 router.replace('/dashboard')
//             }

//             if (response.status === 401) {
//                 toast.error('Credenciais inválidas');
//             }

//             if (response.status === 500) {
//                 toast.error('Erro interno no servidor');
//             }

//         } catch (error) {
//             toast.error('Erro ao conectar com o servidor');
//         } finally {
//             setLoading(false);
//         }
//     }


//     return (
//         <div
//             className="h-screen bg-center bg-cover bg-no-repeat flex flex-col justify-between"
//             style={{ backgroundImage: `url(${BackgroundImage.src})` }}
//         >

//             <div className='flex-1 px-5 text-white bg-black/50 flex flex-col'>
//                 <div className='flex items-center justify-between mt-5'>
//                     <Image
//                         src={ImvpWhiteLogo}
//                         alt='logo'
//                         width={120}
//                     />
//                     <span className='font-semibold text-[14px]'>#Tesouraria</span>
//                 </div>

//                 <div className='flex flex-col items-center mt-10'>
//                     <h1 className='text-2xl font-semibold'>Acesse sua Conta</h1>
//                     <p className='text-center mt-3'>Faça login em uma conta existente na plataforma</p>
//                 </div>

//                 <div className='mt-10 flex flex-col gap-3'>
//                     <input
//                         type="email"
//                         placeholder='E-mail de Acesso'
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className='w-full placeholder:text-gray-600 text-black rounded-md outline-[#3b9b6e] bg-white p-3'
//                     />
//                     <input
//                         type="password"
//                         placeholder='Sua senha'
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className='w-full placeholder:text-gray-600 text-black rounded-md outline-[#3b9b6e] bg-white p-3'
//                     />
//                     <button
//                         onClick={signIn}
//                         disabled={loading}
//                         className='w-full font-semibold hover:bg-[#2d7754] cursor-pointer rounded-md bg-[#3b9b6e] p-3 disabled:opacity-50'
//                     >
//                         {loading ? 'Entrando...' : 'Entrar na Conta'}
//                     </button>
//                 </div>

//             </div>

//             <footer className='text-white bottom-0 p-3 w-full bg-[#3b9b6e] flex items-center justify-center'>
//                 <span>App by <a href="https://www.instagram.com/luciano_mendesz9/" target='_blank' className='underline text-[14px] italic font-semibold hover:text-amber-200'>@luciano_mendesz9</a></span>
//             </footer>
//         </div>
//     )
// } 

'use client'

import BackgroundImage from '@/assets/background.png';
import ImvpWhiteLogo from '@/assets/imvp-white-logo.png'
import Image from 'next/image';
import { z } from 'zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    async function signIn(e: React.FormEvent) {
        e.preventDefault();

        const result = loginSchema.safeParse({ email, password });

        if (!result.success) {
            toast.error('Preencha o formulário corretamente');

            if (password.length < 6) {
                toast.error('A senha deve ter no mínimo 6 caracteres');
            }

            return;
        }

        try {
            setLoading(true);

            const response = await fetch('/api/auth/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.status === 200) {
                toast.success('Login realizado com sucesso!');
                router.push('/dashboard'); // Use push para teste
            } else if (response.status === 401) {
                toast.error('Credenciais inválidas');
            } else if (response.status === 500) {
                toast.error('Erro interno no servidor');
            } else {
                toast.error('Erro inesperado');
            }

        } catch (error) {
            toast.error('Erro ao conectar com o servidor');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="h-screen bg-center bg-cover bg-no-repeat flex flex-col justify-between"
            style={{ backgroundImage: `url(${BackgroundImage.src})` }}
        >

            <div className='flex-1 px-5 text-white bg-black/50 flex flex-col'>
                <div className='flex items-center justify-between mt-5'>
                    <Image
                        src={ImvpWhiteLogo}
                        alt='logo'
                        width={120}
                    />
                    <span className='font-semibold text-[14px]'>#Tesouraria</span>
                </div>

                <div className='flex flex-col items-center mt-10'>
                    <h1 className='text-2xl font-semibold'>Acesse sua Conta</h1>
                    <p className='text-center mt-3'>Faça login em uma conta existente na plataforma</p>
                </div>

                <form onSubmit={signIn} className='mt-10 flex flex-col gap-3'>
                    <input
                        type="email"
                        placeholder='E-mail de Acesso'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full placeholder:text-gray-600 text-black rounded-md outline-[#3b9b6e] bg-white p-3'
                    />
                    <input
                        type="password"
                        placeholder='Sua senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full placeholder:text-gray-600 text-black rounded-md outline-[#3b9b6e] bg-white p-3'
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className='w-full font-semibold hover:bg-[#2d7754] cursor-pointer rounded-md bg-[#3b9b6e] p-3 disabled:opacity-50'
                    >
                        {loading ? 'Entrando...' : 'Entrar na Conta'}
                    </button>
                </form>

            </div>

            <footer className='text-white bottom-0 p-3 w-full bg-[#3b9b6e] flex items-center justify-center'>
                <span>App by <a href="https://www.instagram.com/luciano_mendesz9/" target='_blank' className='underline text-[14px] italic font-semibold hover:text-amber-200'>@luciano_mendesz9</a></span>
            </footer>
        </div>
    )
}
