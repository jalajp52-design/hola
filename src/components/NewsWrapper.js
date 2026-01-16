import React from 'react';
import { useParams } from 'react-router-dom';
import News from './News';

export default function NewsWrapper(props) {
  const { query } = useParams(); // get search query from URL
  return <News {...props} key={`search-${query}`} searchQuery={query} />;
}
