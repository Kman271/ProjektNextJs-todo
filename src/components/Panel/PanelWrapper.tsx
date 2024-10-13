import {WrapperProps} from "@/libs/types/wrapperTypes";

export default function PanelWrapper({ children }: WrapperProps) {
    return (

        <div className='w-full h-full flex flex-col items-center space-y-4'>
            {children}
        </div>

    )
}