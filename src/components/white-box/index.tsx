export default function WhiteBox({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full p-4 bg-white border border-gray-400 rounded-2xl">
            {children}
        </div>
    )
}