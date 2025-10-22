export default function AuthLayout({ children }) {
    return (
        <div className="w-full h-full flex items-center justify-center min-h-fit py-1">
            { children }
        </div>
    )
}