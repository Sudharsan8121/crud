// components/ItemList.js
import React from 'react';
import './ItemList.css'; // Ensure this file contains the necessary styles

const ItemList = ({ items, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Profession</th>
          <th>Update</th>
          
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td> {/* Display sequential ID */}
            <td>{item.name}</td>
            <td>{item.address}</td>
            <td>{item.phone}</td>
            <td>{item.email}</td>
            <td>{item.profession}</td>
            
            <td className="actions">
              <button className="edit" onClick={() => onEdit(index)}>Edit</button>
              <button className="delete" onClick={() => onDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ItemList;
