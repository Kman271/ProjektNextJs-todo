import LoginWindow from "@/components/LoginWindow";
import {AuthButtonWrapper} from "@/components/AuthButtonWrapper";

export default function LoginPage() {
    return(
        <AuthButtonWrapper>
            <LoginWindow/>
        </AuthButtonWrapper>
    )
}