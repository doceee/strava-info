import { useEffect, useState } from 'preact/hooks';
import stravaApiCall from '../utils/stravaApiCall';
import formatDate from '../utils/transformDate';
import './style.css';

const App = () => {
  const [activity, setActivity] = useState(undefined);
  useEffect(async () => {
    setActivity(await stravaApiCall());
  }, []);

  return (
    <main>
      {activity !== undefined && (
        <>
          <h3>Last activity {formatDate(activity.start_date)}</h3>
        </>
      )}
    </main>
  );
};
export default App;
