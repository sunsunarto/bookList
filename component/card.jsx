export default function PayCard({ books, onRemove, onCheckout }) {
  return (
    <div className="card">
      <h2>Pay For Your Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <div>
              <h3>{book.title}</h3>
              <p>Quantity: {book.quantity}</p>
              <p>Price: ${book.price * book.quantity}</p>
              <button className="cancelButton" onClick={() => onRemove(book.id)}>Cancel</button>
            </div>
          </li>
        ))}
      </ul>
      <p className="total">
        Total: ${books.reduce((total, book) => total + book.price * book.quantity, 0).toFixed(2)}
      </p>
      <button className="checkoutButton" onClick={onCheckout}>Checkout</button>
    </div>
  );
}   