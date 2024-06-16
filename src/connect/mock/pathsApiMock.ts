import { HttpResponse, PathParams, http } from "msw"
import { FetchPathsResponse, PathResponse } from "../pathsApi/Responses"
import { v4 as uuidV4 } from "uuid"
import { FetchPathsRequest } from "../pathsApi/Requests"
import path from "path"
import { MaxSpeed, Path, Point, Surface } from "../pathsApi/Types"

export const handlersPathsApiMock = [
    http.get('https://mock.com/paths/get/', ({request}) => {
        const id = new URL(request.url).searchParams.get('id')

        if(!id) return HttpResponse.error()

        return HttpResponse.json<PathResponse>({
            id: uuidV4(),
            name: "test",
            tracks: [
                {
                    firstId: '',
                    secondId: '',
                    distance: 300,
                    surface: Surface.GROUND,
                    maxSpeed: MaxSpeed.NORMAL
                },
                {
                    firstId: '',
                    secondId: '',
                    distance: 800,
                    surface: Surface.SAND,
                    maxSpeed: MaxSpeed.SLOW
                },
                {
                    firstId: '',
                    secondId: '',
                    distance: 200,
                    surface: Surface.ASPHALT,
                    maxSpeed: MaxSpeed.NORMAL
                },
                {
                    firstId: '',
                    secondId: '',
                    distance: 500,
                    surface: Surface.GROUND,
                    maxSpeed: MaxSpeed.NORMAL
                },
                {
                    firstId: '',
                    secondId: '',
                    distance: 1200,
                    surface: Surface.ASPHALT,
                    maxSpeed: MaxSpeed.FAST
                }
            ]
        })
    }),

    http.post<PathParams, FetchPathsRequest>('https://mock.com/paths/fetch', async ({request}) => {
        const data = request.json()
        console.log('x')

        //if((await data)) return

        console.log('s')

        const paths = [
            {
                id: uuidV4(),
                name: "test",
                tracks: [
                    {
                        firstId: '',
                        secondId: '',
                        distance: 200,
                        surface: Surface.GROUND,
                        maxSpeed: MaxSpeed.NORMAL
                    },
                    {
                        firstId: '',
                        secondId: '',
                        distance: 800,
                        surface: Surface.SAND,
                        maxSpeed: MaxSpeed.SLOW
                    },
                    {
                        firstId: '',
                        secondId: '',
                        distance: 200,
                        surface: Surface.ASPHALT,
                        maxSpeed: MaxSpeed.NORMAL
                    },
                    {
                        firstId: '',
                        secondId: '',
                        distance: 500,
                        surface: Surface.GROUND,
                        maxSpeed: MaxSpeed.NORMAL
                    },
                    {
                        firstId: '',
                        secondId: '',
                        distance: 1200,
                        surface: Surface.ASPHALT,
                        maxSpeed: MaxSpeed.FAST
                    }
                ]
            },

            {
                id: uuidV4(),
                name: "long",
                tracks: [
                    {
                        firstId: '',
                        secondId: '',
                        distance: 300,
                        surface: Surface.GROUND,
                        maxSpeed: MaxSpeed.NORMAL
                    },
                    {
                        firstId: '',
                        secondId: '',
                        distance: 5800,
                        surface: Surface.SAND,
                        maxSpeed: MaxSpeed.SLOW
                    },
                    {
                        firstId: '',
                        secondId: '',
                        distance: 3200,
                        surface: Surface.ASPHALT,
                        maxSpeed: MaxSpeed.NORMAL
                    },
                    {
                        firstId: '',
                        secondId: '',
                        distance: 200,
                        surface: Surface.ASPHALT,
                        maxSpeed: MaxSpeed.NORMAL
                    },
                    {
                        firstId: '',
                        secondId: '',
                        distance: 500,
                        surface: Surface.ASPHALT,
                        maxSpeed: MaxSpeed.FAST
                    },
                    {
                        firstId: '',
                        secondId: '',
                        distance: 1500,
                        surface: Surface.GROUND,
                        maxSpeed: MaxSpeed.NORMAL
                    },
                    {
                        firstId: '',
                        secondId: '',
                        distance: 50,
                        surface: Surface.ASPHALT,
                        maxSpeed: MaxSpeed.FAST
                    },
                    {
                        firstId: '',
                        secondId: '',
                        distance: 2500,
                        surface: Surface.GROUND,
                        maxSpeed: MaxSpeed.NORMAL
                    },
                    {
                        firstId: '',
                        secondId: '',
                        distance: 1200,
                        surface: Surface.ASPHALT,
                        maxSpeed: MaxSpeed.FAST
                    }
                ]
            },

            {
                id: uuidV4(),
                name: "long normal",
                tracks: [
                    {
                        firstId: '',
                        secondId: '',
                        distance: 800,
                        surface: Surface.GROUND,
                        maxSpeed: MaxSpeed.NORMAL
                    },
                    {
                        firstId: '',
                        secondId: '',
                        distance: 3400,
                        surface: Surface.SAND,
                        maxSpeed: MaxSpeed.SLOW
                    },
                    {
                        firstId: '',
                        secondId: '',
                        distance: 1200,
                        surface: Surface.ASPHALT,
                        maxSpeed: MaxSpeed.NORMAL
                    },
                    {
                        firstId: '',
                        secondId: '',
                        distance: 200,
                        surface: Surface.GROUND,
                        maxSpeed: MaxSpeed.NORMAL
                    },
                    {
                        firstId: '',
                        secondId: '',
                        distance: 1200,
                        surface: Surface.ASPHALT,
                        maxSpeed: MaxSpeed.NORMAL
                    }
                ]
            },

            {
                id: uuidV4(),
                name: "crazy",
                tracks: [
                    {
                        firstId: '',
                        secondId: '',
                        distance: 200,
                        surface: Surface.GROUND,
                        maxSpeed: MaxSpeed.FAST
                    },
                    {
                        firstId: '',
                        secondId: '',
                        distance: 50,
                        surface: Surface.GROUND,
                        maxSpeed: MaxSpeed.FAST
                    },
                    {
                        firstId: '',
                        secondId: '',
                        distance: 600,
                        surface: Surface.SAND,
                        maxSpeed: MaxSpeed.NORMAL
                    },
                    {
                        firstId: '',
                        secondId: '',
                        distance: 400,
                        surface: Surface.ASPHALT,
                        maxSpeed: MaxSpeed.FAST
                    },
                    {
                        firstId: '',
                        secondId: '',
                        distance: 100,
                        surface: Surface.ASPHALT,
                        maxSpeed: MaxSpeed.FAST
                    },
                    {
                        firstId: '',
                        secondId: '',
                        distance: 2200,
                        surface: Surface.SAND,
                        maxSpeed: MaxSpeed.FAST
                    }
                ]
            }
        ] as Path[]

        const points = [] as Point[]

        const getRandomArbitrary = (min: number, max: number) => Math.random() * (max - min) + min;
        

        paths.forEach(p => {
            p.tracks[0] = {
                ...p.tracks[0],
                firstId: uuidV4(),
                secondId: uuidV4(),
            }

            points.push({
                id: p.tracks[0].firstId,
                name: 'start',
                height: getRandomArbitrary(50, 1000)
            })

            for(let i = 1; i < p.tracks.length; ++i){
                const id = uuidV4()

                p.tracks[i] = {
                    ...p.tracks[i],
                    firstId: p.tracks[i - 1].secondId,
                    secondId: id,
                }

                if(i + 1 === p.tracks.length) {
                    points.push({
                        id: p.tracks[i - 1].secondId,
                        name: `n - ${i - 1}`,
                        height: getRandomArbitrary(50, 1000)
                    })
                    
                    points.push({
                        id: p.tracks[i].secondId,
                        name: `n - ${i}`,
                        height: getRandomArbitrary(50, 1000)
                    })
                }
                else points.push({
                    id: p.tracks[i - 1].secondId,
                    name: `n - ${i - 1}`,
                    height: getRandomArbitrary(50, 1000)
                })
        }
        })

        console.log(paths)
        console.log(points)

        return HttpResponse.json<FetchPathsResponse>({paths: paths, points: points})
    })
]