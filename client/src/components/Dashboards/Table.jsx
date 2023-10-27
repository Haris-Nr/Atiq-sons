import React from 'react'

const Table = () => {
  return (
    <div>
        <table>
            <thead>
            <tr>
                <th>No</th>
                <th>Product Name</th>
                <th>ASIN</th>
                <th>Category</th>
                <th>Date Added</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>pic product Name link </td>
                    <td>asin no</td>
                    <td>game</td>
                    <td>12 june 2023</td>
                    <td>$34</td>
                    <td>45pcs</td>
                    <td>5.00(2.1Reviews)</td>
                    <td></td>
                </tr>
            </tbody>

        </table>
    </div>
  )
}

export default Table