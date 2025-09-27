import { Link, useNavigate, useParams } from "react-router-dom";

const productList = [
    { id: 1, name: "Mobile" },
    { id: 2, name: "Laptop" },
    { id: 3, name: "Headphones" },
    { id: 4, name: "Washing Machine" },
    { id: 5, name: "TV" },
    { id: 6, name: "Refrigerator" },
    { id: 7, name: "Microwave" },
    { id: 8, name: "Dishwasher" },
    { id: 9, name: "Oven" },
    { id: 10, name: "Stove" },
]
export const ProductDetails = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>Product Details Page</h1>
            <h2>Product :{id}</h2>
            <h2>Product Name: {productList.find((product) => product.id === Number(id))?.name}</h2>
        </div>
    )
}

export const Product = () => {
    return (
        <div>
            <h1>Product</h1>
            {productList.map((product) => (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <Link to={`/product/${product.id}`}>View Details</Link>
                </div>
            ))}
        </div>
    )
}

export const Contact = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate("/about")}>About</button>
            <h1>Contact</h1>
        </div>
    )
}

export const NotFound = () => {
    return (
        <div>
            <h1>404 Page Not Found</h1>
        </div>
    )
}