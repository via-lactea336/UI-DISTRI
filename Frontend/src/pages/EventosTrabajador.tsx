'use client'

import React, { useState, useEffect } from 'react'
import { eventosService } from '../services/eventos.service'
import { ActividadesDTO } from '../types'
import { EventoConActividadesDTO } from '../types'
import { actividadesService } from '../services/actividades.service'

export default function WorkerEvents() {
    const [isLoading, setIsLoading] = useState(true)
    const [events, setEvents] = useState<EventoConActividadesDTO[]>([])
    const [expandedEventId, setExpandedEventId] = useState<number | null>(null)
    const [editingEventId, setEditingEventId] = useState<number | null>(null)
    const [editedEvent, setEditedEvent] = useState<EventoConActividadesDTO | null>(null)
    const [editingActivityId, setEditingActivityId] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [newActivity, setNewActivity] = useState<{ nombre: string; descripcion: string }>({ nombre: '', descripcion: '' })

    useEffect(() => {
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
        fetchEvents()
    }, [])

    const toggleEventDetails = (eventId: number) => {
        setExpandedEventId(expandedEventId === eventId ? null : eventId)
    }

    const handleEdit = (event: EventoConActividadesDTO) => {
        setEditingEventId(event.eventoId)
        setEditedEvent({ ...event })
    }

    const handleSave = async () => {
        if (editedEvent) {
            try {
                await eventosService.updateEvento(editedEvent.eventoId, editedEvent)
                setEvents(events.map(event =>
                    event.eventoId === editedEvent.eventoId ? editedEvent : event
                ))
                setEditingEventId(null)
                setEditedEvent(null)
            } catch (err) {
                setError("Error saving event")
            }
        }
    }

    const handleCancelEdit = () => {
        setEditingEventId(null)
        setEditedEvent(null)
    }

    const handleDelete = async (eventId: number) => {
        try {
            await eventosService.deleteEvento(eventId)
            setEvents(events.filter(event => event.eventoId !== eventId))
        } catch (err) {
            setError("Error deleting event")
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (editedEvent) {
            setEditedEvent({
                ...editedEvent,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleEditActivity = (eventId: number, activityId: number) => {
        setEditingEventId(eventId)
        setEditingActivityId(activityId)
        const event = events.find(e => e.eventoId === eventId)
        if (event) {
            setEditedEvent({ ...event })
        }
    }

    const handleActivityInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, activityId: number) => {
        if (editedEvent) {
            const updatedActivities = editedEvent.actividades.map(activity =>
                activity.actividadId === activityId
                    ? { ...activity, [e.target.name]: e.target.value }
                    : activity
            )
            setEditedEvent({
                ...editedEvent,
                actividades: updatedActivities
            })
        }
    }

    const handleSaveActivity = async () => {
        if (editedEvent) {
            try {
                await eventosService.updateEvento(editedEvent.eventoId, editedEvent)
                setEvents(events.map(event =>
                    event.eventoId === editedEvent.eventoId ? editedEvent : event
                ))
                setEditingEventId(null)
                setEditingActivityId(null)
                setEditedEvent(null)
            } catch (err) {
                setError("Error saving activity")
            }
        }
    }

    const handleCancelEditActivity = () => {
        setEditingEventId(null)
        setEditingActivityId(null)
        setEditedEvent(null)
    }

    const handleDeleteActivity = async (eventId: number, activityId: number) => {
        const event = events.find(e => e.eventoId === eventId)
        if (event) {
            const updatedActivities = event.actividades.filter(activity => activity.actividadId !== activityId)
            const updatedEvent = { ...event, actividades: updatedActivities }

            try {
                await eventosService.updateEvento(eventId, updatedEvent)
                setEvents(events.map(e => e.eventoId === eventId ? updatedEvent : e))
            } catch (err) {
                setError("Error deleting activity")
            }
        }
    }

    const handleNewActivityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewActivity({
            ...newActivity,
            [e.target.name]: e.target.value
        })
    }

    const handleAddActivity = async (eventId: number) => {
        if (newActivity.nombre && newActivity.descripcion) {
            const event = events.find(e => e.eventoId === eventId)
            if (event) {
                const newActivityId = Math.max(...event.actividades.map(a => a.actividadId), 0) + 1
                const updatedEvent = {
                    ...event,
                    actividades: [
                        ...event.actividades,
                        { ...newActivity, actividadId: newActivityId }
                    ]
                }

                try {
                    await eventosService.updateEvento(eventId, updatedEvent)
                    //setEvents(events.map(e => e.eventoId === eventId ? updatedEvent : e))
                    setNewActivity({ nombre: '', descripcion: '' })
                } catch (err) {
                    setError("Error adding activity")
                }
            }
        }
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
                            <div className="flex flex-col md:flex-row justify-between items-start">
                                <div className="md:w-2/3">
                                    {editingEventId === event.eventoId ? (
                                        <>
                                            <input
                                                type="text"
                                                name="nombreEvento"
                                                value={editedEvent?.nombreEvento || ''}
                                                onChange={handleInputChange}
                                                className="text-xl font-semibold mb-2 w-full border rounded px-2 py-1"
                                            />
                                            <input
                                                type="datetime-local"
                                                name="fecha"
                                                value={editedEvent?.fecha.slice(0, 16) || ''}
                                                onChange={handleInputChange}
                                                className="text-sm text-gray-500 mb-2 w-full border rounded px-2 py-1"
                                            />
                                            <input
                                                type="text"
                                                name="lugar"
                                                value={editedEvent?.lugar || ''}
                                                onChange={handleInputChange}
                                                className="text-sm text-gray-500 mb-2 w-full border rounded px-2 py-1"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <h2 className="text-xl font-semibold mb-2">{event.nombreEvento}</h2>
                                            <p className="text-sm text-gray-500 mb-2">
                                                Fecha: {new Date(event.fecha).toLocaleDateString()} || {new Date(event.fecha).toLocaleTimeString()}
                                            </p>
                                            <p className="text-sm text-gray-500 mb-2">
                                                Lugar: {event.lugar}
                                            </p>
                                        </>
                                    )}
                                </div>
                                <div className="flex space-x-2 mt-2 md:mt-0">
                                    {editingEventId === event.eventoId ? (
                                        <>
                                            <button
                                                onClick={handleSave}
                                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200"
                                            >
                                                Guardar
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-200"
                                            >
                                                Cancelar
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => handleEdit(event)}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(event.eventoId)}
                                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
                                            >
                                                Eliminar
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <button
                                className="w-full mt-4 bg-gray-100 p-2 text-left font-semibold hover:bg-gray-200 transition-colors duration-200 flex justify-between items-center rounded-md"
                                onClick={() => toggleEventDetails(event.eventoId)}
                            >
                                <span>Ver detalles y actividades</span>
                                <span className="text-2xl">{expandedEventId === event.eventoId ? '▲' : '▼'}</span>
                            </button>
                        </div>

                        {expandedEventId === event.eventoId && (
                            <div className="p-4 bg-gray-50 border-t">
                                <h3 className="text-lg font-semibold mb-2">Actividades</h3>
                                <div className="space-y-4">
                                    {event.actividades.map((activity: ActividadesDTO) => (
                                        <div key={activity.actividadId} className="bg-white border rounded-md p-4">
                                            {editingActivityId === activity.actividadId ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        name="nombre"
                                                        value={editedEvent?.actividades.find(a => a.actividadId === activity.actividadId)?.nombre || ''}
                                                        onChange={(e) => handleActivityInputChange(e, activity.actividadId)}
                                                        className="text-md font-semibold mb-2 w-full border rounded px-2 py-1"
                                                    />
                                                    <textarea
                                                        name="descripcion"
                                                        value={editedEvent?.actividades.find(a => a.actividadId === activity.actividadId)?.descripcion || ''}
                                                        onChange={(e) => handleActivityInputChange(e, activity.actividadId)}
                                                        className="text-gray-600 w-full border rounded px-2 py-1"
                                                        rows={3}
                                                    />
                                                    <div className="mt-2 space-x-2">
                                                        <button
                                                            onClick={handleSaveActivity}
                                                            className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200"
                                                        >
                                                            Guardar
                                                        </button>
                                                        <button
                                                            onClick={handleCancelEditActivity}
                                                            className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-200"
                                                        >
                                                            Cancelar
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <h4 className="text-md font-semibold">{activity.nombre}</h4>
                                                    <p className="text-gray-600">{activity.descripcion}</p>
                                                    <div className="mt-2 space-x-2">
                                                        <button
                                                            onClick={() => handleEditActivity(event.eventoId, activity.actividadId)}
                                                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteActivity(event.eventoId, activity.actividadId)}
                                                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 bg-white border rounded-md p-4">
                                    <h4 className="text-md font-semibold mb-2">Agregar nueva actividad</h4>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={newActivity.nombre}
                                        onChange={handleNewActivityChange}
                                        placeholder="Nombre de la actividad"
                                        className="w-full border rounded px-2 py-1 mb-2"
                                    />
                                    <textarea
                                        name="descripcion"
                                        value={newActivity.descripcion}
                                        onChange={handleNewActivityChange}
                                        placeholder="Descripción de la actividad"
                                        className="w-full border rounded px-2 py-1 mb-2"
                                        rows={3}
                                    />
                                    <button
                                        onClick={() => handleAddActivity(event.eventoId)}
                                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200"
                                    >
                                        Agregar Actividad
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
