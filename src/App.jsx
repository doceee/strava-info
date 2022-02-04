import { useEffect, useState } from 'preact/hooks';
import stravaApiCall from '../utils/stravaApiCall';
import formatDate from '../utils/transformDate';
import formatDistance from '../utils/transformDistance';
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
          <p>Last activity</p>
          <div className='activity'>
            <span className='cell'>
              Type:
              <br /> {activity.name}{' '}
            </span>
            <span className='cell'>
              Date:
              <br /> {formatDate(activity.start_date)}{' '}
            </span>
            <span className='cell'>
              Distance:
              <br /> {formatDistance(activity.distance)} km
            </span>
          </div>
        </>
      )}
    </main>
  );
};
export default App;
