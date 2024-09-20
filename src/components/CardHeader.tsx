import {WrapperProps} from "@/libs/types/wrapperTypes";

export default function CardHeader({children, className="" } :WrapperProps) {

    return(
        <div className={`mt-0 flex flex-col items-center justify-center w-full ${className}`}>
            {children}
        </div>
    )
}