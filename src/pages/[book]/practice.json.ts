// The rows of a whole book for the book practice dialog of the home page: /1a/practice.json …
// A separate route next to [lesson].astro; it is only fetched when the dialog is opened.
import type { APIRoute, GetStaticPaths } from 'astro';
import { buildBookPractice } from '../../lib/bookPractice';
import { BOOKS, type BookCode } from '../../lib/content';

export const getStaticPaths = (() =>
  BOOKS.map(book => ({ params: { book: book.toLowerCase() }, props: { book } }))) satisfies GetStaticPaths;

export const GET: APIRoute<{ book: BookCode }> = ({ props }) =>
  new Response(JSON.stringify(buildBookPractice(props.book)), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
