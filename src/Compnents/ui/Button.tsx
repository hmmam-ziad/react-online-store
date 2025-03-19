import { DOMAttributes, ReactNode } from "react";

interface Iprops extends DOMAttributes<HTMLButtonElement>{
    children: ReactNode;
    className?: string;
    width: 'w-full' | 'w-fit';
}

const Button = ({children, className, width="w-full", ...rest}: Iprops) => {
    // console.log({rest})
    return(
        <button className={`${className} ${width} p-2 rounded-md text-white`} {...rest}>
            {children}
        </button>
    );
}

export default Button