import {submitButtonProps} from "@/libs/types/buttonTypes";

export default function SubmitButton(props: submitButtonProps) {
    return(
        <button
            className={`w-full h-[2rem] mx-auto mb-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-[0.9rem] text-white font-bold 
        shadow-md shadow-gray-900
        transition-transform hover:scale-105 ease-out duration-300
        ${props.className}`}>
            {props.label}
        </button>
    )
}