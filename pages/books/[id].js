import React from "react";
import Link from "next/link";
import "../index.css";

export async function getStaticPaths() {
  const res = await fetch("https://fakerestapi.azurewebsites.net/api/v1/Books");
  const books = await res.json();
  const paths = books.slice(0, 10).map((book) => ({ params: { id: book.id.toString() } }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`https://fakerestapi.azurewebsites.net/api/v1/Books/${params.id}`);
    if (!res.ok) return { notFound: true };

    const book = await res.json();
    return { props: { book }, revalidate: 10 };
  } catch (error) {
    return { notFound: true };
  }
}

export default function BookDetail({ book }) {
  if (!book) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <p>Published on: {book.publishDate}</p>
      <p>Pages: {book.pageCount}</p>
      <Link href="/">
        <button className="goback">Go Back</button>
      </Link>
    </div>
  );
}