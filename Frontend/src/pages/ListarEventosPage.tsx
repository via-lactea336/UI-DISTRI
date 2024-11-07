'use client'

import React, { useState, useEffect } from 'react'
import { EventoConActividadesDTO, ActividadesDTO } from '../types'
import { eventosService } from '../services/eventos.service'
import { actividadesService } from '../services/actividades.service'

export default function EventViewer() {
    const [events, setEvents] = useState<EventoConActividadesDTO[]>([])
    const [expandedEventId, setExpandedEventId] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        try {
            setIsLoading(true)
            const eventos = (await eventosService.getEventos()).content
            const eventosConActividades = await Promise.all(
                eventos.map(async (evento) => {
                    const actividades = (await actividadesService.getActividadesByEventoId(evento.eventoId)).content
                    return {
                        eventoId: evento.eventoId,
                        trabajadorId: evento.trabajadorId,
                        nombreEvento: evento.nombreEvento,
                        fecha: evento.fecha,
                        lugar: evento.lugar,
                        actividades: actividades,
                    } as EventoConActividadesDTO
                })
            )
            setEvents(eventosConActividades)
            setError(null)
        } catch (err) {
            setError('Error al cargar los eventos y actividades.')
            console.error('Error fetching events and activities:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const toggleEventDetails = (eventId: number) => {
        setExpandedEventId(expandedEventId === eventId ? null : eventId)
    }

    if (isLoading) {
        return <div className="container mx-auto p-6 text-center">Cargando eventos...</div>
    }

    if (error) {
        return <div className="container mx-auto p-6 text-center text-red-500">{error}</div>
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Visor de Eventos</h1>

            <div className="space-y-6">
                {events.map(event => (
                    <div key={event.eventoId} className="border rounded-md overflow-hidden shadow-md">
                        <div className="p-4 bg-white">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-2/3">
                                    <h2 className="text-xl font-semibold mb-2">{event.nombreEvento}</h2>
                                    <p className="text-sm text-gray-500 mb-2">
                                        Fecha: {new Date(event.fecha).toLocaleDateString()} || {new Date(event.fecha).toLocaleTimeString()}
                                    </p>
                                    <p className="text-sm text-gray-500 mb-2">
                                        Lugar: {event.lugar}
                                    </p>
                                    <button
                                        className="w-full mt-2 bg-gray-100 p-2 text-left font-semibold hover:bg-gray-200 transition-colors duration-200 flex justify-between items-center rounded-md"
                                        onClick={() => toggleEventDetails(event.eventoId)}
                                    >
                                        <span>Ver actividades</span>
                                        <span className="text-2xl">{expandedEventId === event.eventoId ? '▲' : '▼'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {expandedEventId === event.eventoId && (
                            <div className="p-4 bg-gray-50 border-t">
                                <h3 className="text-lg font-semibold mb-2">Actividades</h3>
                                <div className="space-y-4">
                                    {event.actividades.map((activity: ActividadesDTO) => (
                                        <div key={activity.actividadId} className="bg-white border rounded-md p-4">
                                            <h4 className="text-md font-semibold">{activity.nombre}</h4>
                                            <p className="text-gray-600">{activity.descripcion}</p>
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