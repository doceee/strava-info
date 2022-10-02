import {
    stravaApiCall,
    formatDate,
    formatDistance,
    formatTime,
} from './helpers'
import { useEffect, useState } from 'preact/hooks'

const App = () => {
    const [activities, setActivities] = useState()
    const [sortActivities, setSortActivities] = useState(false)

    const onFilteInput = (e) => {
        setTimeout(async () => {
            let filteredActivities = await stravaApiCall()
            const name = e.target.value

            if (name) {
                filteredActivities = filteredActivities.filter(
                    (activity) =>
                        formatDistance(activity.distance).split('.')[0] === name
                )
            }

            setActivities(filteredActivities)
        }, 300)
    }

    const sort = () => {
        let sortedActivities = activities.sort(
            (a, b) => parseFloat(a.elapsed_time) - parseFloat(b.elapsed_time)
        )

        setActivities(sortedActivities)
        setSortActivities(!sortActivities)
    }

    useEffect(() => {
        if (sortActivities) {
            setSortActivities(!sortActivities)
        }
    }, [activities])

    useEffect(async () => {
        const activities = await stravaApiCall()

        setActivities(activities)
    }, [])

    return (
        <div>
            <input type="text" placeholder="Filter..." onInput={onFilteInput} />
            <table>
                <tr>
                    <th>Type</th>
                    <th>Moving Time</th>
                    <th onClick={sort}>Elapsed Time</th>
                    <th>Distance</th>
                    <th>Date</th>
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
