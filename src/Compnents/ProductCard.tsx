import { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/function";
import Image from "./Image";
import Button from "./ui/Button";


interface Iprops {
    product: IProduct;
}

const ProductCard = ({product}: Iprops) => {
    const {title, description, imageURL, price} = product;
    return(
        <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3">
            <Image imageURL={imageURL} alt="product Image" className={"rounded-md h-52 w-full lg:object-cover"} />
            <h3 className="text-lg font-semibold">{title}</h3>
            <p>
                {txtSlicer(description)}
            </p>
            <div className="flex items-center my-4 space-x-2">
                <span className="w-5 h-5 bg-indigo-600 rounded-full cursor-pointer"/>
                <span className="w-5 h-5 bg-yellow-600 rounded-full cursor-pointer"/>
                <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer"/>
            </div>

            <div className="flex items-center justify-between">
                <span>${price}</span>
                <Image imageURL={imageURL} alt="product Image" className={"w-10 h-10 rounded-full object-center"} />
            </div>

            <div className="flex items-center justify-between space-x-2 mt-5">
                <Button className="bg-indigo-700" width="w-full">Edit</Button>
                <Button className="bg-red-700" width="w-full">Edit</Button>
            </div>
        </div>
    );
}

export default ProductCard