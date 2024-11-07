'use client'

import React, { useEffect, useState } from 'react'
import { ActividadCreate, EventoCreate } from '../types'
import { useAuth } from '../context/AuthContext'
import { eventosService } from '../services/eventos.service'
import { actividadesService } from '../services/actividades.service'
import { Navigate, useNavigate } from 'react-router-dom'

interface Activity {
    id: number
    title: string
    description: string
    personLimit: number
}

export default function EventCreator() {
    const { userResponseDTO } = useAuth();
    const [eventTitle, setEventTitle] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');

    const [activities, setActivities] = useState<Activity[]>([]);
    const [activityTitle, setActivityTitle] = useState('');
    const [activityDescription, setActivityDescription] = useState('');
    const [activityPersonLimit, setActivityPersonLimit] = useState('');
    const [editingActivityId, setEditingActivityId] = useState<number | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const eventoData: EventoCreate = {
                trabajadorId: userResponseDTO.idClienteTrabajador,
                nombreEvento: eventTitle,
                fecha: `${eventDate}T${eventTime}:00`,
                lugar: eventDescription
            };

            const createdEvent = await eventosService.createEvento(eventoData);
            const eventoId = createdEvent.eventoId;

            if (activities.length > 0) {
                for (const activity of activities) {
                    const actividadData: ActividadCreate = {
                        eventoId,
                        nombre: activity.title,
                        descripcion: activity.description,
                    };
                    await actividadesService.createActividad(actividadData);
                }
            }

            console.log('Evento y actividades creados con éxito');
            setEventTitle('');
            setEventDescription('');
            setEventDate('');
            setEventTime('');
            setActivities([]);
        } catch (error) {
            console.error('Error al crear evento y actividades:', error);
        }
    };

    const handleAddActivity = (e: React.FormEvent) => {
        e.preventDefault()
        if (editingActivityId !== null) {
            setActivities(activities.map(activity =>
                activity.id === editingActivityId
                    ? { ...activity, title: activityTitle, description: activityDescription, personLimit: Number(activityPersonLimit) }
                    : activity
            ))
            setEditingActivityId(null)
        } else {
            const newActivity: Activity = {
                id: Date.now(),
                title: activityTitle,
                description: activityDescription,
                personLimit: Number(activityPersonLimit)
            }
            setActivities([...activities, newActivity])
        }
        setActivityTitle('')
        setActivityDescription('')
        setActivityPersonLimit('')
    }

    const handleEditActivity = (activity: Activity) => {
        setActivityTitle(activity.title)
        setActivityDescription(activity.description)
        setActivityPersonLimit(activity.personLimit.toString())
        setEditingActivityId(activity.id)
    }

    const handleDeleteActivity = (id: number) => {
        setActivities(activities.filter(activity => activity.id !== id))
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Crear Nuevo Evento</h1>

            <form onSubmit={handleSubmit} className="mb-8">
                <div className="mb-4">
                    <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700">Título del Evento</label>
                    <input
                        type="text"
                        id="eventTitle"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00D67D] focus:ring focus:ring-[#00D67D] focus:ring-opacity-50"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">Descripción del Evento</label>
                    <textarea
                        id="eventDescription"
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00D67D] focus:ring focus:ring-[#00D67D] focus:ring-opacity-50"
                        rows={3}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">Fecha del Evento</label>
                    <input
                        type="date"
                        id="eventDate"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00D67D] focus:ring focus:ring-[#00D67D] focus:ring-opacity-50"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="eventTime" className="block text-sm font-medium text-gray-700">Hora del Evento</label>
                    <input
                        type="time"
                        id="eventTime"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00D67D] focus:ring focus:ring-[#00D67D] focus:ring-opacity-50"
                        required
                    />
                </div>

                <h2 className="text-2xl font-bold mb-4">Actividades del Evento</h2>

                <div className="mb-4">
                    <label htmlFor="activityTitle" className="block text-sm font-medium text-gray-700">Título de la Actividad</label>
                    <input
                        type="text"
                        id="activityTitle"
                        value={activityTitle}
                        onChange={(e) => setActivityTitle(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00D67D] focus:ring focus:ring-[#00D67D] focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="activityDescription" className="block text-sm font-medium text-gray-700">Descripción de la Actividad</label>
                    <textarea
                        id="activityDescription"
                        value={activityDescription}
                        onChange={(e) => setActivityDescription(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00D67D] focus:ring focus:ring-[#00D67D] focus:ring-opacity-50"
                        rows={2}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="activityPersonLimit" className="block text-sm font-medium text-gray-700">Límite de Personas</label>
                    <input
                        type="number"
                        id="activityPersonLimit"
                        value={activityPersonLimit}
                        onChange={(e) => setActivityPersonLimit(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00D67D] focus:ring focus:ring-[#00D67D] focus:ring-opacity-50"
                        min="1"
                    />
                </div>

                <button
                    type="button"
                    onClick={handleAddActivity}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    {editingActivityId !== null ? 'Actualizar Actividad' : 'Agregar Actividad'}
                </button>

                <div className="space-y-4 mb-4">
                    {activities.map(activity => (
                        <div key={activity.id} className="border rounded-md p-4">
                            <h3 className="text-lg font-semibold">{activity.title}</h3>
                            <p className="text-gray-600">{activity.description}</p>
                            <p className="text-sm text-gray-500">Límite de personas: {activity.personLimit}</p>
                            <div className="mt-2 space-x-2">
                                <button
                                    type="button"
                                    onClick={() => handleEditActivity(activity)}
                                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                >
                                    Editar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteActivity(activity.id)}
                                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <button type="submit" className="w-full px-4 py-2 bg-[#00D67D] text-white rounded-md hover:bg-[#00B468] focus:outline-none focus:ring-2 focus:ring-[#00D67D] focus:ring-opacity-50">
                    Crear Evento y Actividades
                </button>
            </form>
        </div>
    )
}