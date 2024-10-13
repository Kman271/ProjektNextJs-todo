import {buttonProps} from "@/libs/types/buttonTypes";

export default function SmallButton(

    {className, label, onClick}: buttonProps) {

    return (

        <button
            className={`w-fit py-1 px-2 bg-gradient-to-br from-gray-600 to-gray-700 border-none shadow-md shadow-gray-900
                        ${className}`}
            onClick={onClick}
        >
            {label}
        </button>

    )
}