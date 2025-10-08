import React from "react";
import Link from "next/link";
import "./index.css";

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
  return (
    <div>
      <div className="header">
        <div className="left">
          <div className="circle" />
          <h1>Book List</h1>
        </div>
        <div className="right">
          <button>Cart</button>
        </div>
      </div>
      {error && <p clsassName="error">Error: {error}</p>}
      {books.length > 0 ? (
        <div className="bookList">
          {books.map((book) => (
            <div key={book.id} className="book" >
              <Link href={`/books/${book.id}`}>
                <h2 className="bookTitle">{book.title}</h2>
              </Link>
              <p>{book.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
}

