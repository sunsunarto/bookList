import { useState } from "react";
import Link from "next/link";
import PayCard from "../component/card.jsx";

export async function getServerSideProps() {
  try {
    const res = await fetch("https://fakerestapi.azurewebsites.net/api/v1/Books");
    if (!res.ok) {
      throw new Error("Failed to fetch books");
    }
    const books = await res.json();
    return { props: { books } };
  } catch (error) {
    return { props: { books: [], error: error.message } };
  }
}

export default function Home({ books, error }) {
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState([]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToCart = (book) => {
    setCartCount(cartCount + 1);

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === book.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...book, quantity: 1, price: 10 }];
      }
    });
  };

  const handleRemoveFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== bookId));
    setCartCount((prevCount) => Math.max(prevCount - 1, 0));
  };

  const handleCheckout = () => {
    alert("Thank you for your purchase!");
    setCart([]);
    setCartCount(0);
    setOpen(false);
  };

  return (
    <div>
      <div className="header">
        <div className="left">
          <div className="circle" />
          <h1>Book List</h1>
        </div>
        <div className="right">
          <button onClick={handleClick}>Cart ({cartCount}) </button>
          {open && (
            <div className="modalOverlay" onClick={handleClose}>
              <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                <button className="closeButton" onClick={handleClose}>×</button>
                <PayCard
                  books={cart}
                  onRemove={handleRemoveFromCart}
                  onCheckout={handleCheckout}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {error && <p className="error">Error: {error}</p>}
      {books.length > 0 ? (
        <div className="bookList">
          {books.map((book) => (
            <div key={book.id} className="book">
              <Link href={`/books/${book.id}`}>
                <h2 className="bookTitle">{book.title}</h2>
              </Link>
              <p>{book.description}</p>
              <button onClick={() => handleAddToCart(book)}>Add To Cart</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
}
