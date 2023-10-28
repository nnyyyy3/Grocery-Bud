import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GroceryBud() {
  const [text, setText] = useState<string>('');
  const [items, setItems] = useState<string[]>([]);
 
  const saveItemsToLocalStorage = () => {
    const itemsJson = JSON.stringify(items);
    localStorage.setItem('groceryItems', itemsJson);
  };

  useEffect(() => {
    const addedItems = localStorage.getItem('groceryItems');
    if (addedItems) {
      setItems(JSON.parse(addedItems));
    }
  }, []);   

  const addItem = () => {
    if (text.trim() !== '') {
      setItems([...items, text]);
      setText('');
      saveItemsToLocalStorage();
      toast.success(`${text} is placed in the cart`, {
        position: 'top-center',
      });
    } else {
      toast.error('Please Input an Item', {
        position: 'top-center',
      });
    }
  };

  const removeItem = (index: number) => {
    const itemName = items[index];
    setItems(items.filter((_, i) => i !== index));
    saveItemsToLocalStorage();
    toast.warning(`${itemName} is removed from the cart`, {
      position: 'top-center',
    });
  };

  const togglePurchased = (index: number) => {
    const newItems = [...items];
    const currentItem = items[index];
    if (currentItem.startsWith('✓ ')) {
      newItems[index] = currentItem.replace('✓ ', '');
    } else {
      newItems[index] = `✓ ${currentItem}`;
    }
    setItems(newItems);
    saveItemsToLocalStorage();
  };

  return (
    <div className='container'>
      <h1>Grocery Bud</h1>
      <input
        className='itemField'
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a grocery item"
      />
      <button className='addItemBttn' onClick={addItem}>
        Add to Cart
      </button>
      <div className="item-container">
        {items.map((item, index) => (
          <div key={index} className="item">
            <input
              type="checkbox"
              onChange={() => togglePurchased(index)}
              checked={item.startsWith('✓')}
            />
            <span style={{ textDecoration: item.startsWith('✓') ? 'line-through' : 'none' }}>
              {item.replace('✓ ', '')}
            </span>
            <button className='removeBttn' onClick={() => removeItem(index)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default GroceryBud;
