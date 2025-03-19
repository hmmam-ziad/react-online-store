interface Iprops {
    imgURL: string;
    alt: string;
    className: string;
}

const imageProduct = ({imgURL, alt, className}: Iprops) => {
    return(
        <img src={imgURL} alt={alt} className={className} />
    );
}

export default imageProduct