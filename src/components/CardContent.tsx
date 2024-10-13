import {WrapperProps} from "@/libs/types/wrapperTypes";

export default function CardContent({children, className="" } :WrapperProps) {

    return(

        <div className={`flex flex-col items-center flex-shrink-0
                         ${className}`}>
            {children}
        </div>

    )
}