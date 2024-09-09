import {submitButtonProps} from "@/libs/types/buttonTypes";

export default function SubmitButton(props: submitButtonProps) {
    return(
        <button
            onClick={props.onClick && props.onClick }
            className={`w-full h-[2.5rem] mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-[1rem] text-white font-bold
        shadow-md shadow-gray-900
        transition-transform hover:scale-105 ease-out duration-300
        ${props.className}`}>
            {props.label}
        </button>
    )
}