import React from "react";
import { Link } from "react-router-dom";
import "./IndexPage.css";

function IndexPage() {
  return (
    <div>
      <nav>
        <div>
          <img
            src="https://th.bing.com/th/id/R.a7a81c13133825795764b2e8b2b97354?rik=Q6efV5uJtB%2ff%2fw&riu=http%3a%2f%2ffresh-agro.com%2fwp-content%2fuploads%2f2020%2f09%2fLOGO-Fresh-Agro-01.png&ehk=L%2fqUf7LjZ%2bVXJpKewlBHbIbcGQFZrRfeIiyXMZW%2bO7Y%3d&risl=&pid=ImgRaw&r=0"
            alt="Logo"
            width="100"
            height="100"
          />
        </div>
        <div>
          <ul>
            <li>
              <Link className="btn" to="/home">Go to Home</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <h1>Welcome to Smart Agro Market</h1>

        <section className="steps">
          <div className="step">
            <h3>Browse Products</h3>
            <p>Explore fresh farm produce directly from farmers.</p>
          </div>
          <div className="step">
            <h3>Add to Cart</h3>
            <p>Select products you want and add them to your cart.</p>
          </div>
          <div className="step">
            <h3>Place Order</h3>
            <p>Confirm your order and choose delivery options.</p>
          </div>
          <div className="step">
            <h3>Delivery</h3>
            <p>Get fresh products delivered to your doorstep.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default IndexPage;
