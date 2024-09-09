import {WrapperProps} from "@/libs/types/wrapperTypes";

export default function CardHeader({children, className="" } :WrapperProps) {

    return(
        <div className={`w-full ${className}`}>
            {children}
        </div>
    )
}