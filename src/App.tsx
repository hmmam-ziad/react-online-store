import { ChangeEvent, FormEvent, useState } from "react"
import ProductCard from "./Compnents/ProductCard"
import Modal from "./Compnents/ui/Modal"
import { categories, colors, formInputsList, productList } from "./Data"
import Button from "./Compnents/ui/Button";
import SelectMenu from "./Compnents/ui/SelectMenu";
import Input from "./Compnents/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./Validation";
import ErrorMessage from "./Compnents/ErrorMessage";
import CircleColor from "./Compnents/CircleColor";
import { v4 as uuid } from "uuid";
import { TProductNames } from "./Types";



function App() {
    const defaultProduct = {
      title: '',
      description: '',
      imageURL: '',
      price: '',
      colors: [],
      category: {
        name: '',
        imageURL: '',
      }
    }

    const [products, setProducts] = useState<IProduct[]>(productList);  
    const [product, setProduct] = useState<IProduct>(defaultProduct);  
    const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProduct);
    const [errors, setErrors] = useState({title: '', description: '', imageURL: '', price: ''});
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEditModal, setisOpenEditModal] = useState(false);
    const [tempColors, setTempColors] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  
    function open() {
      setIsOpen(true)
    }
  
    function close() {
      setProduct(defaultProduct);
      setIsOpen(false)
    }


    function openEdit() {
      setisOpenEditModal(true)
    }
  
    function closeEdit() {
      setisOpenEditModal(false)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;

        setProduct({
          ...product,
          [name]: value,
        });
        setErrors({
          ...errors,
          [name]: ''
        });
    };

    const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const {value, name} = event.target;

      setProductToEdit({
        ...productToEdit,
        [name]: value,
      });
      setErrors({
        ...errors,
        [name]: ''
      });
  };

  const renderProduct = products.map(product => <ProductCard key={product.id} product={product} setProductToEdit={setProductToEdit} openEditModal={openEdit}/>)
  
  const renderFormInputList = formInputsList.map(input => (
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id} className="mb-[1px] text-sm font-medium text-gray-700">{input.label}</label>
      <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler}/>
      <ErrorMessage msg={errors[input.name]}/>
    </div>
  ));


  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    // console.log(product);
    event.preventDefault();
    const {title , description, price, imageURL} = product;

    const errors = productValidation({ title, description, imageURL, price});
    // console.log(errors);

    const hasErrorMsg = Object.values(errors).some(value => value === '') && Object.values(errors).every(value => value === '');
    if(!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    // console.log({...product, id: uuid(), colors: tempColors});
    
    
    setProducts(prev => [{...product, id: uuid(), colors: tempColors, category: selectedCategory}, ...prev]);
    setProduct(defaultProduct);
    setTempColors([]);
    close();
    
  }



  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    // console.log(product);
    event.preventDefault();
    const {title , description, price, imageURL} = productToEdit;

    const errors = productValidation({ title, description, imageURL, price});
    // console.log(errors);

    const hasErrorMsg = Object.values(errors).some(value => value === '') && Object.values(errors).every(value => value === '');
    if(!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    // console.log({...product, id: uuid(), colors: tempColors});
    
    
    setProductToEdit(defaultProduct);
    setTempColors([]);
    close();
    
  }


  const renderProductEditWithErrorMsg = (id: string, label: string, name: TProductNames) => {
    return(
      <div className="flex flex-col">  
        <label htmlFor={id} className="mb-[1px] text-sm font-medium text-gray-700">{label}</label>
        <Input type="text" id={id} name={name} value={productToEdit[name]} onChange={onChangeEditHandler}/>
        <ErrorMessage msg={errors[name]}/>
    </div>
    );
  };

  const renderColor = colors.map(color => <CircleColor key={color} color={color} onClick={() => {
      if(tempColors.includes(color)) {
        setTempColors(prev => prev.filter(item => item !== color));
        return;
      }
      setTempColors((prev) => [...prev, color]);
    }}
  />)

  return (
      <main className="container">
        <Button className="bg-indigo-700 hover:bg-indigo-800" width="w-full" onClick={open}>Add</Button>
        <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 rounded-md">
          {renderProduct}
        </div>

        {/* Add Product Modal  */}
        <div className="bg-white">
          <Modal isOpen={isOpen} close={close} title="Add New Product">
            <form className="space-y-3" onSubmit={submitHandler}>
              {renderFormInputList}
              <SelectMenu selected={selectedCategory} setSelected={setSelectedCategory}/>
              <div className="flex items-center flex-wrap my-4 space-x-1">
                {renderColor}
              </div>
              
              <div className="flex items-center flex-wrap my-4 space-x-1">
                {tempColors.map(color => (<span key={color} className="p-1 mr-1 text-xs rounded-md text-white" style={{backgroundColor: color}}>{color}</span>))}
              </div>
              <div className="flex items-center space-x-3">
                <Button className="bg-indigo-700 hover:bg-indigo-800" width="w-full">Submit</Button>
                <Button className="bg-gray-400 hover:bg-gray-500" width="w-full" onClick={close}>Cancle</Button>
              </div>
            </form>
          </Modal>
        </div>

        {/* Edit Product Modal  */}
        <div className="bg-white">
          <Modal isOpen={isOpenEditModal} close={closeEdit} title="Edit Product">
            <form className="space-y-3" onSubmit={submitEditHandler}>
              {renderProductEditWithErrorMsg('title', 'Product Title', 'title')}
              {renderProductEditWithErrorMsg('description', 'Product Description', 'description')}
              {renderProductEditWithErrorMsg('imageURL', 'Product Image URL', 'imageURL')}
              {renderProductEditWithErrorMsg('price', 'Product Price', 'price')}
              {/* {renderFormInputList}
              <SelectMenu selected={selectedCategory} setSelected={setSelectedCategory}/>
              <div className="flex items-center flex-wrap my-4 space-x-1">
                {renderColor}
              </div>
              
              <div className="flex items-center flex-wrap my-4 space-x-1">
                {tempColors.map(color => (<span key={color} className="p-1 mr-1 text-xs rounded-md text-white" style={{backgroundColor: color}}>{color}</span>))}
              </div> */}
              <div className="flex items-center space-x-3">
                <Button className="bg-indigo-700 hover:bg-indigo-800" width="w-full">Submit</Button>
                <Button className="bg-gray-400 hover:bg-gray-500" width="w-full" onClick={closeEdit}>Cancle</Button>
              </div>
            </form>
          </Modal>
        </div>

      </main>
  )
}

export default App;

