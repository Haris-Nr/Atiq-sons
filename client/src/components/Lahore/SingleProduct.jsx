import React from "react";

import { Button, Tag } from "antd";




function SingleProduct() {
    return (
        <div className=" max-w-screen-lg mx-auto">
            <div className="grid grid-cols-2  m-5 ">
                {/* Images */}
                <div className="">
                    <img
                        src='/men.webp'
                        alt=""
                        className="w-96 h-full border-red-300 mx-auto border-dotted p-1 object-cover rounded-md"
                    />
                </div>


                {/* details */}
                <div className="text-start">
                    <div className="w-96">
                        <div className="flex justify-between items-center">
                            <h1 className="font-semibold text-xl py-3">Pent & Shirts</h1>
                            <Button type="primary" shape="round">Delete</Button>
                        </div>
                            <h1 className="text-2xl font-bold py-5">188.00$</h1>
                            <h1 className="py-2">★★★★☆</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla blanditiis vel soluta impedit, qui reiciendis enim autem nobis voluptatibus aut pariatur fuga beatae molestias consequuntur provident dolores nemo dolore voluptates tempore quidem perspiciatis ab molestiae aliquam tenetur? Commodi aspernatur iusto ea laboriosam enim libero, cum exercitationem voluptatibus, dolores repellendus totam?</p>
                            <h1 className="py-4"> <span className="font-bold"> Category: </span> Mens T-shirts & Pents</h1>
                            <h1 className="py-4"> <span className="font-bold"> Asin No: </span> 123456</h1>
                            <h1 className="py-4"> <span className="font-bold"> Quantity: </span> 123 Pcs</h1>
                            <h1 className="py-4"> <span className="font-bold"> Status: </span> <Tag color="yellow" >Pending</Tag></h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct
