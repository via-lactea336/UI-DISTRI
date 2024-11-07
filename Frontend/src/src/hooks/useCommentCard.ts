import { useState } from "react";
import { CalificacionDetalleWithUser } from "../types";

const useCommentCard = (
  detalle: CalificacionDetalleWithUser,
  onSave: (
    detalle: CalificacionDetalleWithUser,
    editedComentario: string,
    editedCalificacion: number
  ) => Promise<void>,
  onDelete: (detalleId: number) => Promise<void>
) => {
  const [editingDetalleId, setEditingDetalleId] = useState<number | null>(null);
  const [editedComentario, setEditedComentario] = useState<string>("");
  const [editedCalificacion, setEditedCalificacion] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

  const handleEdit = () => {
    setEditingDetalleId(detalle.calificacionDetalleId);
    setEditedComentario(detalle.comentario);
    setEditedCalificacion(detalle.calificacion);
  };

  const handleSave = async () => {
    setLoading(true);
    await onSave(detalle, editedComentario, editedCalificacion);
    setEditingDetalleId(null);
    setLoading(false);
  };

  const handleCancel = () => {
    setEditingDetalleId(null);
    setEditedComentario("");
    setEditedCalificacion(0);
  };

  const handleDelete = async () => {
    setShowConfirmDialog(false);
    setLoading(true);
    await onDelete(detalle.calificacionDetalleId);
    setLoading(false);
  };

  return {
    editingDetalleId,
    editedComentario,
    editedCalificacion,
    loading,
    showConfirmDialog,
    handleEdit,
    handleSave,
    handleCancel,
    handleDelete,
    setShowConfirmDialog,
    setEditedCalificacion,
    setEditedComentario,
  };
};

export default useCommentCard;
