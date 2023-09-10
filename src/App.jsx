import {
    formatTime,
    formatDate,
    stravaApiCall,
    formatDistance,
} from './helpers'
import { useEffect, useState } from 'preact/hooks'

const App = () => {
    const [activities, setActivities] = useState()

    useEffect(async () => {
        const activities = await stravaApiCall()

        setActivities(activities)
    }, [])

    return (
        <div>
            <table>
                <tr>
                    <th>Type</th>
                    <th>Moving Time</th>
                    <th onClick={() => sort('elapsed_time')}>Elapsed Time</th>
                    <th>Distance</th>
                    <th onClick={() => sort('start_date')}>Date</th>
                </tr>
                {activities &&
                    activities.map((activity, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{activity.name}</td>
                                <td>{formatTime(activity.moving_time)}</td>
                                <td>{formatTime(activity.elapsed_time)}</td>
                                <td>{formatDistance(activity.distance)}</td>
                                <td>{formatDate(activity.start_date)}</td>
                            </tr>
                        )
                    })}
            </table>
        </div>
    )
}

export default App
