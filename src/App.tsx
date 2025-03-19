import { ChangeEvent, useState } from "react"
import ProductCard from "./Compnents/ProductCard"
import Modal from "./Compnents/ui/Modal"
import { formInputsList, productList } from "./Data"
import Button from "./Compnents/ui/Button";
import Input from "./Compnents/ui/Input";
import { IProduct } from "./interfaces";



function App() {
    const[product, setProduct] = useState<IProduct>({
      title: '',
      description: '',
      imageURL: '',
      price: '',
      colors: [],
      category: {
        name: '',
        imageURL: '',
      }
    });  


    const [isOpen, setIsOpen] = useState(false)
  
    function open() {
      setIsOpen(true)
    }
  
    function close() {
      setIsOpen(false)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;

        setProduct({
          ...product,
          [name]: value,
        });
    };

  const renderProduct = productList.map(product => <ProductCard key={product.id} product={product}/>)
  
  const renderFormInputList = formInputsList.map(input => (
    <div className="flex flex-col">
      <label htmlFor={input.id} className="mb-[1px] text-sm font-medium text-gray-700">{input.label}</label>
      <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler}/>
    </div>
  ));


  return (
      <main className="container">
        <Button className="bg-indigo-700 hover:bg-indigo-800" width="w-full" onClick={open}>Add</Button>
        <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 rounded-md">
          {renderProduct}
        </div>
        <div className="bg-white">
          <Modal isOpen={isOpen} close={close} title="Add New Product">
            <form className="space-y-3">
              {renderFormInputList}
              <div className="flex items-center space-x-3">
                <Button className="bg-indigo-700 hover:bg-indigo-800" width="w-full">Submit</Button>
                <Button className="bg-gray-400 hover:bg-gray-500" width="w-full">Cancle</Button>
              </div>
            </form>
          </Modal>
        </div>
      </main>
  )
}

export default App
