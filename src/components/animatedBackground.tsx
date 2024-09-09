import {WrapperProps} from "@/libs/types/wrapperTypes";

export default function AnimatedBackground({children, className = ""}: WrapperProps) {

    const circleConfigs = [
        {left: '10%', width: '1.5rem', height: '1.5rem', animationDelay: '2s', animationDuration: '12s'},
        {left: '20%', width: '1rem', height: '1rem', animationDelay: '2s', animationDuration: '35s'},
        {left: '25%', width: '10rem', height: '10rem', animationDelay: '0s'},
        {left: '35%', width: '9rem', height: '9rem', animationDelay: '7s'},
        {left: '40%', width: '4rem', height: '4rem', animationDelay: '0s', animationDuration: '18s'},
        {left: '50%', width: '1.5rem', height: '1.5rem', animationDelay: '15s', animationDuration: '45s'},
        {left: '65%', width: '1rem', height: '1rem', animationDelay: '0s'},
        {left: '70%', width: '1.5rem', height: '1.5rem', animationDelay: '4s'},
        {left: '75%', width: '7rem', height: '7rem', animationDelay: '3s'},
        {left: '85%', width: '10rem', height: '10rem', animationDelay: '0s', animationDuration: '11s'}
    ];

    return (
        <>
            <div className={`w-full absolute z-0 ${className}`}>
                {children}
            </div>
            <div className="w-full h-full bg-gradient-to-t from-indigo-950/80 from-10% to-sky-600/80 z-[-1]">
                <ul className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    {
                        circleConfigs.map((circleCfg, index) => (
                            <li key={index}
                                className="absolute block list-none w-[1.5rem] h-[1.5rem] bg-sky-50/75 cubeAnimation rounded-[10%] bottom-[-9rem]"
                                style={{
                                    left: circleCfg.left,
                                    width: circleCfg.width,
                                    height: circleCfg.height,
                                    animationDelay: circleCfg.animationDelay,
                                    animationDuration: circleCfg.animationDuration
                                }}
                            />
                        ))
                    }
                </ul>
            </div>
        </>
    )
}