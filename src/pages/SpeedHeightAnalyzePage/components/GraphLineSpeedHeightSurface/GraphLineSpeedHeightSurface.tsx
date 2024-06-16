import { useEffect, useRef, useState } from "react"
import { Area, AreaChart, Brush, CartesianAxis, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, ScatterChart, Tooltip, XAxis, YAxis } from "recharts"

import styles from './GraphLineSpeedHeightSurface.module.scss'
import { MaxSpeed, Surface } from "../../../../connect/pathsApi/Types"
import { PathView, PointView } from "../Types"

interface propsGraphSpeedHeight {
    points: PointView[]
}

export const GraphLineSpeedHeightSurface = (props: propsGraphSpeedHeight) => {
    const maxX_ = Math.max(...props.points.map(p => p.distance))
    const maxY_ = Math.max(...props.points.map(p => p.height))

    const _maxX = useRef(maxX_)
    const _maxY = useRef(maxY_)
    const _minY = useRef(0)
    const _minX = useRef(0)

    const [update, setUpdate] = useState(false)

    useEffect(() => {
        if(update) setUpdate(false)
    }, [update])

    const data = props.points.map(p => { 
        return {
            distance: p.distance,
            height: p.height,
            maxSpeed: p.maxSpeed,
            surface: p.surface
        } as PointView
    })

    console.log(data)
    
    return (
        <div className={styles.main}>
            Клик - увеличить, Уберать мышь с графика - Сбросить
            <div className={styles.paths}>
            <ResponsiveContainer width="100%" height={720}>
                <LineChart
                    data={data}
                    onMouseLeave={() => {
                      _maxX.current = maxX_
                      _maxY.current = maxY_  
                      _minX.current = 0
                      _minX.current = 0 

                      setUpdate(true)
                    }}
                    onClick={(event, e) => {
                        _maxX.current = Number(event.activeLabel) + _maxX.current*0.05
                        //_minY.current = Number(event.activeLabel) - _maxX.current*0.05
                        
                        setUpdate(true)
                    }}
                >
                    <XAxis 
                        allowDataOverflow 
                        dataKey="distance" 
                        type="number" 
                        tickCount={data.length + 2}
                        domain={[_minX.current, _maxX.current]}
                    />
                    <YAxis 
                        allowDataOverflow 
                        type="number" 
                        domain={[_minY.current, _maxY.current*1.2]}
                    />
                    <Tooltip/>
                    <Legend/>
                    <CartesianGrid verticalFill={data.map(p => 
                        p.surface === Surface.ASPHALT
                        ? "gray"
                        : p.surface === Surface.GROUND 
                            ? "brown"
                            : p.surface === Surface.SAND
                                ? "yellow"
                                : "red"
                    )}/>

                    <defs> 
                        <linearGradient id={"color-speed"} x1="0" y1="0" x2="100%" y2="0">
                            {data.map((p, i) => {

                                return (
                                    <stop 
                                        offset={`${100 / data.length * i + 100 / data.length}%`} 
                                        stopColor={p.maxSpeed === MaxSpeed.FAST
                                            ? "red"
                                            : p.maxSpeed === MaxSpeed.NORMAL 
                                                ? "green"
                                                : p.maxSpeed === MaxSpeed.SLOW
                                                    ? "black"
                                                    : "yellow"
                                        }   
                                    />                            
                                )
                            })}                         
                        </linearGradient>
                    </defs>


                        
                    {data.map((p, i) => {
                        return (<Line 
                            className={styles.line}
                            key={p.id}
                            type="monotone" 
                            dataKey={"height"} 
                            strokeWidth={3}
                            stroke={`url(#color-speed)`}//{rgbToHex(200 + 5*i, 250 + 5*i, 100 + 30*i)} 
                        />)
                    })}
                </LineChart>
            </ResponsiveContainer>
            </div>
        </div>
    )
}