import { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/function";
import CircleColor from "./CircleColor";
import Image from "./Image";
import Button from "./ui/Button";


interface Iprops {
    product: IProduct;
    setProductToEdit: (product: IProduct) => void;
    openEditModal: () => void;
    idx: number;
    setProductToEditIdx: (value: number) => void;
}

const ProductCard = ({product, setProductToEdit, openEditModal,idx , setProductToEditIdx}: Iprops) => {
    const {title, description, imageURL, price, colors} = product;

    const renderColor = colors.map(color => <CircleColor key={color} color={color} />)

    const onEdit = () => {
        setProductToEdit(product);
        openEditModal();
        setProductToEditIdx(idx);
    }

    const onRemove = () =>{
    }

    return(
        <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3">
            <Image imageURL={imageURL} alt="product Image" className={"rounded-md h-52 w-full lg:object-cover"} />
            <h3 className="text-lg font-semibold">{title}</h3>
            <p>
                {txtSlicer(description)}
            </p>
            <div className="flex items-center flex-wrap my-4 space-x-1">
                {renderColor}
              </div>
            {/* <div className="flex items-center my-4 space-x-2">
                <span className="w-5 h-5 bg-indigo-600 rounded-full cursor-pointer"/>
                <span className="w-5 h-5 bg-yellow-600 rounded-full cursor-pointer"/>
                <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer"/>
            </div> */}

            <div className="flex items-center justify-between">
                <span>${price}</span>
                <Image imageURL={imageURL} alt="product Image" className={"w-10 h-10 rounded-full object-center"} />
            </div>

            <div className="flex items-center justify-between space-x-2 mt-5">
                <Button className="bg-indigo-700" width="w-full" onClick={onEdit}>Edit</Button>
                <Button className="bg-red-700" width="w-full" onClick={onRemove}>Delete</Button>
            </div>
        </div>
    );
}

export default ProductCard