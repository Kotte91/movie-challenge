import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/discover/movie',
          params: {
            include_adult: 'false',
            include_video: 'false',
            language: 'en-US',
            page: '1',
            sort_by: 'popularity.desc',
          },
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMWMyYWE0NWUzZjA5Zjg3N2JhOWNlMmJmMTZjOWQwMCIsInN1YiI6IjY1OWQ4NzRlZmM1ZjA2MDE0YWNiMzZkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EORNcPkv_zd0yo5vOq5jZOz7OzMyJ7mn51HEc_clEiI',
          },
        };

        const response = await axios.request(options);

        setMovies(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.error('Error al obtener la lista de películas:', error);
      }
    };


    fetchData();
  }, []);

  return (
    <div>
      <h2>Lista de Películas</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}> <img src={movie.backdrop_path} alt='hola' /> {movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
