export default function SmallButton(
    {className, label, onClick}: { className?: string, label: string, onClick?: any }) {

    return (
        <button
            className={`w-fit py-1 px-2 bg-gradient-to-br from-gray-600 to-gray-700 border-none shadow-md shadow-gray-900
        ${className}`}
            onClick={onClick}>
            {label}
        </button>
    )
}