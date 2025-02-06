import { Link } from 'react-router-dom';

const Navigationtrail = ({ pageName }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-xl text-3xl font-semibold text-gray-600 dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/business">
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-primary text-blue-400">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Navigationtrail;
