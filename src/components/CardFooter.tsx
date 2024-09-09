import {WrapperProps} from "@/libs/types/wrapperTypes";

export default function CardFooter({children, className="" } :WrapperProps) {

    return(
        <div className={`${className}`}>
            {children}
        </div>
    )
}