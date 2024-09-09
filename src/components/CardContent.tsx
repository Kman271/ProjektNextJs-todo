import {WrapperProps} from "@/libs/types/wrapperTypes";

export default function CardContent({children, className="" } :WrapperProps) {

    return(
        <div className={`${className}`}>
            {children}
        </div>
    )
}