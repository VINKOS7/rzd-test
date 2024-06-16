import { useEffect, useRef, useState } from "react"
import { Area, AreaChart, Brush, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, ScatterChart, Tooltip, XAxis, YAxis } from "recharts"

import styles from './GraphsSpeedHeight.module.scss'
import { MaxSpeed, Surface } from "../../../../connect/pathsApi/Types"
import { PathView } from "../Types"

interface propsGraphsSpeedHeight {
    paths: PathView[]
}

export const GraphsSpeedHeight = (props: propsGraphsSpeedHeight) => {
    const maxX_ = Math.max(...props.paths.map(pth => pth.points.map(p => p.distance)).flat())
    const maxY_ = Math.max(...props.paths.map(pth => pth.points.map(p => p.height)).flat())

    const _maxX = useRef(maxX_)
    const _maxY = useRef(maxY_)
    const _minY = useRef(0)
    const _minX = useRef(0)

    const [update, setUpdate] = useState(false)

    useEffect(() => {
        if(update) setUpdate(false)
    }, [update])

    const data = props.paths.map(pth => { 
        return {         
            id: pth.id,
            name: pth.name,
            points: pth.points.map(p => { 

                return {
                    distance: p.distance,
                    height: p.height,
                    maxSpeed: p.maxSpeed,
                    surface: p.surface
                }
            })
            
        }
    })


    
    return (
        <div className={styles.main}>
            Клик - увеличить, Уберать мышь с графика - Сбросить
            <div className={styles.paths}>
            <ResponsiveContainer width="100%" height={720}>
                <AreaChart
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
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis 
                        allowDataOverflow 
                        dataKey="distance" 
                        type="number" 
                        domain={[_minX.current, _maxX.current]}
                    />
                    <YAxis 
                        allowDataOverflow 
                        type="number" 
                        domain={[_minY.current, _maxY.current]}
                    />
                    <Tooltip/>
                    <Legend/>

                    {data.map((p, i) => {

                        return (
                            <>
                                <defs> 
                                    <linearGradient id={"LINE" + p.id} x1="0" y1="0" x2="100%" y2="0">
                                            {p.points.map((pn, idx) => {
                                                return (
                                                    <stop 
                                                        offset={`${100 / p.points.length * idx + 100 / p.points.length}%`} 
                                                        stopColor={pn.maxSpeed === MaxSpeed.FAST
                                                            ? "red"
                                                            : pn.maxSpeed === MaxSpeed.NORMAL 
                                                                ? "green"
                                                                : pn.maxSpeed === MaxSpeed.SLOW
                                                                    ? "blue"
                                                                    : "yellow"
                                                        }
                                                        color="yellow"
                                                    />
                                                )
                                            })}                              
                                    </linearGradient>
                                </defs>
                            </>
                        )
                    })}

                    {data.map((p, i) => {

                        return (
                            <>
                                <defs> 
                                    <linearGradient id={"AREA" + p.id} x1="0" y1="0" x2="100%" y2="0">
                                            {p.points.map((pn, idx) => {
                                                return (
                                                    <stop 
                                                        offset={`${100 / p.points.length * idx + 100 / p.points.length}%`} 
                                                        stopColor={pn.surface === Surface.ASPHALT
                                                            ? "gray"
                                                            : pn.surface === Surface.GROUND 
                                                                ? "brown"
                                                                : pn.surface === Surface.SAND
                                                                    ? "yellow"
                                                                    : "blue"
                                                        }
                                                        color="yellow"
                                                    />
                                                )
                                            })}                              
                                    </linearGradient>
                                </defs>
                            </>
                        )
                    })}

                    {data.map((p, i) => {
                        return (<Area 
                            className={styles.line}
                            key={p.id}
                            type="monotone" 
                            dataKey={"height"} 
                            strokeWidth={3}
                            fill={`url(#AREA${p.id})`}
                            stroke={`url(#LINE${p.id})`}//{rgbToHex(200 + 5*i, 250 + 5*i, 100 + 30*i)} 
                            name={p.name}
                            data={p.points}
                        />)
                    })}
                </AreaChart>
            </ResponsiveContainer>
            </div>
        </div>
    )
}