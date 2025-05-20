import React, { useState, useEffect } from 'react';
import "./App.css";
import Form from './components/Form';
import ItemList from './components/ItemList';
import Modal from './components/Modal';

const App = () => {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        // Map the API data to match your fields
        const mappedData = data.map(user => ({
          id: user.id,
          name: user.name,
          address: `${user.address.suite}, ${user.address.street}, ${user.address.city}`,
          phone: user.phone,
          email: user.email,
          profession: user.company.name,
        }));
        setItems(mappedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  const updateItem = (index, updatedItem) => {
    const newItems = items.map((item, i) => (i === index ? updatedItem : item));
    setItems(newItems);
  };

  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleEdit = (index) => {
    setEditItem({ ...items[index], index });
    setShowModal(true);
  };

  const handleModalSubmit = (updatedItem) => {
    updateItem(updatedItem.index, {
      id: updatedItem.id,
      name: updatedItem.name,
      address: updatedItem.address,
      phone: updatedItem.phone,
      email: updatedItem.email,
      profession: updatedItem.profession,
    
    });
    setShowModal(false);
    setEditItem(null);
  };

  return (
    <div className="container">
      <h1>React CRUD Application</h1>
      <Form addItem={addItem} />
      <ItemList items={items} onEdit={handleEdit} onDelete={deleteItem} />
      {showModal && (
        <Modal
          item={editItem}
          onClose={() => setShowModal(false)}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

export default App;
