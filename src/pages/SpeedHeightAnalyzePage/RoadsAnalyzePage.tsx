import { useEffect, useRef, useState } from 'react';

import styles from './RoadsAnalyzePage.module.scss'
import { pathsApi, useFetchPathsQuery, } from '../../connect/pathsApi/pathsApi';
import { FetchPathsRequest } from '../../connect/pathsApi/Requests';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { GraphsSpeedHeight } from './components/GraphsSpeedHeight/GraphsSpeedHeight';
import { MaxSpeed, Surface } from '../../connect/pathsApi/Types';
import { GraphAreaSpeedSurfaceHeight } from './components/GraphAreaSpeedHeightSurface/GraphAreaSpeedSurfaceHeight';
import { PathView, PointView } from './components/Types';
import { GraphLineSpeedHeightSurface } from './components/GraphLineSpeedHeightSurface/GraphLineSpeedHeightSurface';



export const RoadsAnalyzePage = () => {
    const {data, isLoading} = useFetchPathsQuery({offset: 0, size: 20})

    const _paths = useRef([] as PathView[]) 
    const [paths, setPaths] = useState([] as PathView[])
    console.log(data)


    useEffect(() => {
        if(!data) return 

        console.log(data)

        _paths.current = data.paths.map(path => {
            let distance = 0

            const buf = data.points.find(p => p.id === path.tracks[0].firstId)?.height

            const first = {
                id: path.tracks[0].firstId,
                distance: 0,
                height: buf? buf: 0,
                maxSpeed: MaxSpeed.FAST,
                surface: Surface.ASPHALT
            } as PointView

            return {
                id: path.id,
                name: path.name,
                points: [first].concat(path.tracks.map((t, i) => {
                    distance = distance + t.distance

                    const point = data.points.find(p => p.id === t.secondId)
                    console.log(point)
                    console.log(t)


                    return {
                        id: t.secondId,
                        distance: distance,
                        height: point? point.height: 0,
                        maxSpeed: t.maxSpeed,
                        surface: t.surface
                    }
                }))
            } as PathView
        })

        setPaths(_paths.current)
    }, [data])





    return (
        <div className={styles.main}>
            <div className={styles.points}>
                {paths.length > 0 &&
                    <>
                        <GraphLineSpeedHeightSurface 
                            points={paths[0].points}
                        />
                        <GraphAreaSpeedSurfaceHeight 
                            points={paths[0].points}
                        />
                        <GraphsSpeedHeight 
                            paths={paths}
                        />
                    </>
                }
            </div>
        </div>
    )
}