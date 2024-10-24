import RegisterWindow from "@/components/RegisterWindow";
import {AuthSessionWrapper} from "@/components/AuthSessionWrapper";


export default function RegisterPage() {
    return(
        <AuthSessionWrapper>
            <RegisterWindow/>
        </AuthSessionWrapper>
    )
}