import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SingleProduct } from "../../redux/Features/Product/productSlice";
import { useParams } from "react-router-dom";
import { Button, Tag } from "antd";
import TrackProduct from "./TrackProduct";


const SingleProductPage = () => {
    const dispatch = useDispatch();
    let { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(SingleProduct(id));
        }
    }, [dispatch, id]);
    const { SingleProductData } = useSelector((state) => state.product);
    const product = SingleProductData?.data;



    return (
        <>
            <div className="border border-double rounded-lg max-w-screen-lg mx-auto">
                <div className="sm:grid sm:grid-cols-2  m-5 ">
                    {/* Images */}
                    <div className="">
                        {product?.image && (
                            <img
                                src={product.image[0].url}
                                alt="Product Image"
                                className="w-ful h-full"
                            />
                        )}
                    </div>


                    {/* details */}
                    <div className="text-start">
                        <div className="w-full">
                            <div className="flex justify-between items-center">
                                <h1 className="font-semibold text-xl py-3">{product?.productName}</h1>
                                <Button type="primary" shape="round">Delete</Button>
                            </div>
                            <h1 className="text-2xl font-bold py-5">{product?.price}$</h1>
                            <h1 className="py-4"> <span className="font-bold"> Rating: </span>  {product?.rating} </h1>

                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla blanditiis vel soluta impedit, qui reiciendis enim autem nobis voluptatibus aut pariatur fuga beatae molestias consequuntur provident dolores nemo dolore voluptates tempore quidem perspiciatis ab molestiae aliquam tenetur? Commodi aspernatur iusto ea laboriosam enim libero, cum exercitationem voluptatibus, dolores repellendus totam?</p>
                            <h1 className="py-4"> <span className="font-bold"> Category: </span> {product?.category}</h1>
                            <h1 className="py-4"> <span className="font-bold"> Asin No: </span> {product?.asin}</h1>
                            <h1 className="py-4"> <span className="font-bold"> Quantity: </span> {product?.quantity}</h1>
                            <h1 className="py-4"> <span className="font-bold"> Status: </span> <Tag color={status === "pending" ? "yellow" : status === "rejected" ? "red" : "green"}>{product?.status}</Tag></h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <TrackProduct />
            </div>
        </>
    )
}

export default SingleProductPage;
