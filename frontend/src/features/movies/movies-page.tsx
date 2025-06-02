import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import MovieHeader from "./components/movie-header";
import MovieCard from "./components/movie-card";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useNavigate } from "react-router-dom";
import { searchMovies, setPage } from "./moviesSlice";
import PaginationControls from "@/components/ui/pagination-controls";


export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const {movies, currentPage, totalResults} = useAppSelector((state) => state.movie);
  const [search, setSearch] = useState("inception");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    dispatch(setPage(1))
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      if(search.trim()){
        dispatch(searchMovies({search, page: currentPage}))
      }
    }, 500);

    return () => {
      clearTimeout(debounce);
    }
  }, [search, currentPage, navigate]);


  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <MovieHeader />
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="w-full">
          <div className="relative mb-8 max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search movies..."
              className="pl-10 pr-4 py-2 w-full rounded-full border-gray-300 focus:border-primary focus:ring-primary"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>

        {movies.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300">No movies found</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}

       {movies.length > 0 && (
   <PaginationControls
    currentPage={currentPage}
    totalResults={totalResults}
    onPageChange={(page) => dispatch(setPage(page))}
  />
)}


      </div>
    </main>
  );
}
