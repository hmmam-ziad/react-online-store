import { useState } from "react"
import ProductCard from "./Compnents/ProductCard"
import Modal from "./Compnents/ui/Modal"
import { productList } from "./Data"
import Button from "./Compnents/ui/Button";


function App() {
    let [isOpen, setIsOpen] = useState(false)
  
    function open() {
      setIsOpen(true)
    }
  
    function close() {
      setIsOpen(false)
    }
  const renderProduct = productList.map(product => <ProductCard key={product.id} product={product}/>)

  return (
      <main className="container">
        <Button className="bg-indigo-700 hover:bg-indigo-800" width="w-full" onClick={open}>Add</Button>
        <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 rounded-md">
          {renderProduct}
        </div>
        <div>
          <Modal isOpen={isOpen} close={close} title="Add New Product">
            <div className="flex items-center space-x-3">
              <Button className="bg-indigo-700 hover:bg-indigo-800" width="w-full">Submit</Button>
              <Button className="bg-gray-300 hover:bg-gray-400" width="w-full">Cancle</Button>
            </div>
          </Modal>
        </div>
      </main>
  )
}

export default App
