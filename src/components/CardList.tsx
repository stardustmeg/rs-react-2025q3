import CharacterCard from '@/components/CharacterCard';
import ErrorFallback from '@/components/ErrorFallback';
import Loader from '@/components/Loader/Loader';
import NoResultsFound from '@/components/NoResultsFound';
import { useCharactersSearch } from '@/hooks/useCharactersSearch';

interface CardListProps {
  searchQuery: string;
}

const CardList: React.FC<CardListProps> = ({ searchQuery }: CardListProps) => {
  const { characters, error, loading, retry } = useCharactersSearch(searchQuery);
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorFallback onRetry={retry} />;
  }

  return (
    <div className="min-h-screen">
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        data-testid="card-list"
      >
        {characters.length ? (
          characters.map((char) => <CharacterCard character={char} key={char.id} />)
        ) : (
          <NoResultsFound />
        )}
      </div>
    </div>
  );
};

export default CardList;
