import { LoaderCircle } from 'lucide-react';

type SpinnerProps = {
  loading?: boolean;
};

const Spinner = ({ loading = false }: SpinnerProps) => {
  if (loading) {
    return (
      <div className="absolute top-1/2 right-0 left-0 block h-full w-full items-center text-center">
        <div role="status">
          <LoaderCircle
            className="text-accent inline size-10 animate-spin"
            aria-hidden={!loading}
            aria-busy={loading}
          />
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return '';
};

export default Spinner;
