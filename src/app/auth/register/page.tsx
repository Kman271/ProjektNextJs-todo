import RegisterWindow from "@/components/RegisterWindow";
import {AuthButtonWrapper} from "@/components/AuthButtonWrapper";


export default function RegisterPage() {
    return(
        <AuthButtonWrapper>
            <RegisterWindow/>
        </AuthButtonWrapper>
    )
}