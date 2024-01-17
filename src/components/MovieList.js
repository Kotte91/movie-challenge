import React, { useEffect, useState } from 'react';
import './MovieList.css';
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

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesData = await getMovies(page,selectedGenre);
        setMovies(moviesData.results);
        console.log(moviesData);

      } catch (error) {
        // Manejar errores
        console.error('Error fetching movies:', error);
      }
    };

    fetchData();
  }, [page,selectedGenre]);

 function nextPage(){
  setPage(page + 1)
 }
 function previosPage(){
  setPage(page - 1)
 }


  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id} className='cards'>
          <img src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path} alt={movie.title} className='picture'/> 
          <h3 className='titleMovie'>{movie.title}</h3> 
          <p>{movie.release_date}</p>
        </li>
        ))}
      </ul>
      <div className='pagination'>
      <button onClick={previosPage}  className='pre'disabled={page === 1}> Back</button>
      <p className='numberP'> {page}</p>
      <button onClick={nextPage}  className='next'>Next</button>
      </div>
      
    </div>

  );
};

export default MovieList;
