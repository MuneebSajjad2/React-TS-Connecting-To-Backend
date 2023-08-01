import { useEffect, useState } from "react"




const ProductList = ({category} : {category : string}) => {

   const [Products , setProducts] = useState<string[]>([])

    useEffect(() => {
        console.log('Fetching Data' , category);
        

        setProducts(['HouseHold', 'Clothing'])
    }, [category])
  return (
    <div></div>
  )
}

export default ProductList