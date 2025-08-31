import React, { useState } from "react";
import "./Home.css";

const productsData = [
  { id: 1, name: "Apple", price: 120, image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg" },
  { id: 2, name: "Banana", price: 50, image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg" },
  { id: 3, name: "Carrot", price: 30, image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Carrot-Whole.jpg" },
  { id: 4, name: "Tomato", price: 40, image: "https://upload.wikimedia.org/wikipedia/commons/8/88/Tomato_je.jpg" },
  { id: 5, name: "Potato", price: 25, image: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Patates.jpg" },
  { id: 6, name: "Onion", price: 20, image: "https://upload.wikimedia.org/wikipedia/commons/3/33/Onion.jpg" },
  { id: 7, name: "Strawberry", price: 150, image: "https://upload.wikimedia.org/wikipedia/commons/2/29/PerfectStrawberry.jpg" },
  { id: 8, name: "Mango", price: 200, image: "https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg" },
  { id: 9, name: "Grapes", price: 130, image: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Table_grapes_on_white.jpg" },
  { id: 10, name: "Pineapple", price: 180, image: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Pineapple_and_cross_section.jpg" },
  { id: 11, name: "Cabbage", price: 35, image: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Cabbage-Whole.jpg" },
  { id: 12, name: "Spinach", price: 20, image: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Spinacia_oleracea_Spinazie_bloeiend.jpg" },
  { id: 13, name: "Lemon", price: 15, image: "https://upload.wikimedia.org/wikipedia/commons/1/11/Lemon-Whole-Split.jpg" },
  { id: 14, name: "Orange", price: 70, image: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg" },
  { id: 15, name: "Papaya", price: 90, image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Papaya_cross_section_BNC.jpg" },
  { id: 16, name: "Peach", price: 120, image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Peach_and_cross_section.jpg" },
  { id: 17, name: "Pear", price: 100, image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Pears.jpg" },
  { id: 18, name: "Watermelon", price: 80, image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Watermelon_cross_BNC.jpg" },
  { id: 19, name: "Cucumber", price: 25, image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Cucumber.jpg" },
  { id: 20, name: "Bell Pepper", price: 60, image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Bell_peppers.jpg" },
  { id: 21, name: "Blueberry", price: 250, image: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Blueberries.jpg" },
  { id: 22, name: "Kiwi", price: 90, image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Kiwi_aka.jpg" },
  { id: 23, name: "Cherries", price: 300, image: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Cherry_Stella444.jpg" },
  { id: 24, name: "Pumpkin", price: 50, image: "https://upload.wikimedia.org/wikipedia/commons/3/39/Pumpkin.jpg" },
  { id: 25, name: "Cauliflower", price: 40, image: "https://upload.wikimedia.org/wikipedia/commons/1/14/Cauliflower.jpg" },
  { id: 26, name: "Brinjal", price: 35, image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Eggplant.jpg" },
  { id: 27, name: "Green Beans", price: 30, image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Green_beans.jpg" },
  { id: 28, name: "Peas", price: 25, image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Peas_in_pod.jpg" },
  { id: 29, name: "Strawberry Box", price: 180, image: "https://upload.wikimedia.org/wikipedia/commons/2/29/PerfectStrawberry.jpg" },
  { id: 30, name: "Mango Pack", price: 400, image: "https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg" },
];

function Home() {
  const [search, setSearch] = useState("");

  const filteredProducts = productsData.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
       <div><header className="header">
        <h1>Agro Market</h1>
        <div className="profile">
          Geetanjali▼
          <div className="dropdown">
            <p>Email: geetanjali@example.com</p>
            <p>Role: Farmer</p>
          </div>
        </div>
        </header>
    <div className="home-container">
      <h1>Agro Market</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-bar"
      />
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Home;
