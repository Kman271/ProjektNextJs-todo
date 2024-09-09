
export default function SmallButton(
    {className, label, onClick}: {className?: string, label: string, onClick: React.MouseEventHandler<HTMLButtonElement>}) {

    return (
        <button className={`w-fit py-1 px-2 bg-gradient-to-br from-gray-600 to-gray-700 border-none shadow-md shadow-gray-900
        ${className}`}>
            {label}
        </button>
    )
}