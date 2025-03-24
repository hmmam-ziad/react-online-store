import { HTMLAttributes } from "react";

interface Iprops extends HTMLAttributes<HTMLSpanElement> {
    color: string,
}

const CircleColor = ({color, ...rest}: Iprops) => {
    return(
        <span className={`block w-5 h-5 rounded-full cursor-pointer mb-1`} style={{backgroundColor: color}} {...rest} />
    );
}

export default CircleColor