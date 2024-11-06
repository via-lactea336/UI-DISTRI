'use client'

import React, { useEffect, useState } from 'react'
import { publicacionesService } from '../services/publicaciones.service'
import { categoriasService } from '../services/categorias.service'
import { tipoDePrecioService } from '../services/tipoDePrecio.service'
import { calificacionesService } from '../services/calificaciones.service'
import { Categoria, TipoDePrecio } from '../types'

export default function Component() {
    const [title, setTitle] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [priceType, setPriceType] = useState(0)
    const [category, setCategory] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState("")
    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [tipoPrecios, setTipoPrecios] = useState<TipoDePrecio[]>([])

    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageUrl(e.target.value)
    }

    const fetchCategorias = async () => {
        try {
            const categoriasData = await categoriasService.getCategorias()
            setCategorias(categoriasData.content)
        } catch (error) {
            console.error("Error al cargar las categorías:", error)
        }
    }

    const fetchTipoDePrecios = async () => {
        try {
            const tipoPreciosData = await tipoDePrecioService.getTipoDePrecios()
            setTipoPrecios(tipoPreciosData.content)
        } catch (error) {
            console.error("Error al cargar los tipos de precios:", error)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitMessage("")

        try {
            const newPublicacion = await publicacionesService.createPublicacion({
                trabajadorId: 4,
                titulo: title.trim(),
                descripcion: description.trim(),
                categoriaId: category,
                imagen: imageUrl.trim(),
                precio: Number(price),
                tipoDePrecioId: priceType,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            })
            calificacionesService.createCalificacion({
                publicacionId: newPublicacion.trabajadorId,
                calificacionGeneral: 0

            })
            setSubmitMessage(`Publicación creada con éxito. Titulo: ${newPublicacion.titulo}`)
            setTitle("")
            setImageUrl("")
            setDescription("")
            setPrice("")
            setPriceType(0)
            setCategory(0)
        } catch (error) {
            setSubmitMessage("Error al crear la publicación. Por favor, intente de nuevo.")
            console.error("Error creating publication:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(Number(e.target.value))
    }

    const handleTipoPrecioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriceType(Number(e.target.value))
    }

    useEffect(() => {
        fetchCategorias()
        fetchTipoDePrecios()
    }, [])

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Crear Nueva Publicación
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Título de la Publicación
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00D67D] focus:border-[#00D67D]"
                                placeholder="Ej: Servicio de Limpieza Profesional"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                                URL de la Imagen
                            </label>
                            <input
                                id="imageUrl"
                                type="url"
                                value={imageUrl}
                                onChange={handleImageUrlChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00D67D] focus:border-[#00D67D]"
                                placeholder="https://ejemplo.com/imagen.jpg"
                                required
                            />
                            {imageUrl && (
                                <div className="mt-2 rounded-lg overflow-hidden border">
                                    <img
                                        src={imageUrl}
                                        alt="Vista previa"
                                        className="w-full h-48 object-cover"
                                        onError={() => setImageUrl("")}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Descripción
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00D67D] focus:border-[#00D67D]"
                                placeholder="Describe los detalles de tu publicación..."
                                rows={4}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Precio
                            </label>
                            <input
                                id="price"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00D67D] focus:border-[#00D67D]"
                                placeholder="Ej: 50.00"
                                step="0.01"
                                min="0"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="priceType" className="block text-sm font-medium text-gray-700">
                                Tipo de Precio
                            </label>
                            <select
                                id="priceType"
                                value={priceType}
                                onChange={handleTipoPrecioChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00D67D] focus:border-[#00D67D]"
                                required
                            >
                                <option value="">Seleccione un tipo de precio</option>
                                {tipoPrecios.map((tipoPrecio) => (
                                    <option key={tipoPrecio.tipoDePrecioId} value={tipoPrecio.tipoDePrecioId}>
                                        {tipoPrecio.nombreTipo}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Categoría
                            </label>
                            <select
                                id="category"
                                value={category}
                                onChange={handleCategoriaChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00D67D] focus:border-[#00D67D]"
                                required
                            >
                                <option value="">Seleccione una categoría</option>
                                {categorias.map((categoria) => (
                                    <option key={categoria.categoriaId} value={categoria.categoriaId}>
                                        {categoria.nombreCategoria}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-4 py-2 bg-[#00D67D] hover:bg-[#00B468] text-white font-bold rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Publicando...' : 'Publicar Servicio'}
                        </button>

                        {submitMessage && (
                            <p className={`mt-4 text-center ${submitMessage.includes('éxito') ? 'text-green-600' : 'text-red-600'}`}>
                                {submitMessage}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}