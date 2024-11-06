'use client'

import { useState } from 'react'

interface Activity {
    id: number
    title: string
    description: string
    personLimit: number
}

interface Event {
    id: number
    title: string
    description: string
    date: string
    time: string
    activities: Activity[]
}

export default function EventViewer() {
    const [expandedEventId, setExpandedEventId] = useState<number | null>(null)

    const [events, setEvents] = useState<Event[]>([
        {
            id: 1,
            title: "Conferencia de Tecnología",
            description: "Una conferencia sobre las últimas tendencias en tecnología",
            date: "2024-06-15",
            time: "09:00",
            activities: [
                { id: 1, title: "Registro", description: "Registro de participantes", personLimit: 200 },
                { id: 2, title: "Keynote", description: "Discurso de apertura", personLimit: 200 },
                { id: 3, title: "Taller de IA", description: "Taller práctico sobre Inteligencia Artificial", personLimit: 50 }
            ]
        },
        {
            id: 2,
            title: "Festival de Música",
            description: "Un festival con los mejores artistas locales",
            date: "2024-07-20",
            time: "18:00",
            activities: [
                { id: 4, title: "Apertura de puertas", description: "Inicio del evento", personLimit: 1000 },
                { id: 5, title: "Concierto principal", description: "Actuación del artista principal", personLimit: 1000 }
            ]
        }
    ])

    const toggleEventDetails = (eventId: number) => {
        setExpandedEventId(expandedEventId === eventId ? null : eventId)
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Visor de Eventos</h1>

            <div className="space-y-4">
                {events.map(event => (
                    <div key={event.id} className="border rounded-md overflow-hidden">
                        <div className="p-4 bg-white">
                            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                            <p className="text-gray-600 mb-2">{event.description}</p>
                            <p className="text-sm text-gray-500 mb-2">
                                Fecha: {new Date(event.date).toISOString()} - Hora: {event.time}
                            </p>
                            <button
                                className="w-full mt-2 bg-gray-100 p-2 text-left font-semibold hover:bg-gray-200 transition-colors duration-200 flex justify-between items-center"
                                onClick={() => toggleEventDetails(event.id)}
                            >
                                <span>Ver actividades</span>
                                <span className="text-2xl">{expandedEventId === event.id ? '▲' : '▼'}</span>
                            </button>
                        </div>

                        {expandedEventId === event.id && (
                            <div className="p-4 bg-gray-50 border-t">
                                <h3 className="text-lg font-semibold mb-2">Actividades</h3>
                                <div className="space-y-4">
                                    {event.activities.map(activity => (
                                        <div key={activity.id} className="bg-white border rounded-md p-4">
                                            <h4 className="text-md font-semibold">{activity.title}</h4>
                                            <p className="text-gray-600">{activity.description}</p>
                                            <p className="text-sm text-gray-500">Límite de personas: {activity.personLimit}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}