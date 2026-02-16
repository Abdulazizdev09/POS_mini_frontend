import { useEffect, useMemo, useState } from "react";
import { Plus, Edit2, Trash2, X, Save } from "lucide-react";
import { getZones } from "../../api/zones/getZones";
import type { ZoneDto } from "../../types/zone";
import { updateZone } from "../../api/zones/updateZone";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import { softDeleteZone } from "../../api/zones/softDeleteZone";
import { createZone } from "../../api/zones/createZone";

function Zones() {
    const [zones, setZones] = useState<ZoneDto[]>([]);
    const [loading, setLoading] = useState(true);

    const [isInputEmpty, setIsInputEmpty] = useState(false);

    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const [isAdding, setIsAdding] = useState(false);

    const [draftName, setDraftName] = useState<string>("");
    const [draftDescription, setDraftDescription] = useState<string>("");

    const fetchZones = async () => {
        setLoading(true);
        try {
            const data = await getZones();
            setZones(data);
        } catch (error) {
            console.error("Failed to get Zones", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchZones();
    }, []);

    const zoneCountText = useMemo(() => {
        return `${zones.length} zone${zones.length !== 1 ? "s" : ""}`;
    }, [zones.length]);

    const deleteZoneName = useMemo(() => {
        return zones.find((z) => z.id === deleteId)?.name || "this zone";
    }, [zones, deleteId]);

    const handleEdit = (zoneId: string, zoneName: string, zoneDescription: string) => {
        setIsAdding(false);
        setEditingId(zoneId);
        setDraftName(zoneName);
        setDraftDescription(zoneDescription);
        setIsInputEmpty(false);
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingId(null);
        setDraftName("");
        setDraftDescription("");
        setIsInputEmpty(false);
    };

    const handleSave = async () => {
        if (!editingId) return;
        
        const name = draftName.trim();
        const description = draftDescription.trim();

        if (name === "") {
            setIsInputEmpty(true);
            return;
        }
        try {
            await updateZone(editingId, { name, description });
            await fetchZones(); 
            handleCancel();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = (zoneId: string) => {
        setDeleteId(zoneId);
    };

    const closeDelete = () => {
        setDeleteId(null);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;

        try {
            await softDeleteZone(deleteId);
            await fetchZones(); 
        } catch (error) {
            console.log(error);
        } finally {
            closeDelete();
        }
    };

    const openAdd = () => {
        setEditingId(null);
        setIsAdding(true);
        setDraftName("");
        setDraftDescription("");
        setIsInputEmpty(false);
    };

    const handleAdd = async () => {
        const name = draftName.trim()
        const description = draftDescription.trim();

        if (!name) {
            setIsInputEmpty(true);
            return;
        }
        try {
            await createZone({ name, description })
            await fetchZones();
            handleCancel()
        } catch (error) {
            console.log(error);

        }

    };

    if (loading) return <div className="p-8">Loading POS Zones...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-neutral-900">Zones</h2>
                    <p className="text-lg text-neutral-600 mt-1">{zoneCountText}</p>
                </div>

                {!isAdding && !editingId && (
                    <button
                        onClick={openAdd}
                        className="flex items-center gap-3 px-6 py-4 bg-neutral-900 text-white rounded-lg transition-colors cursor-pointer active:brightness-90"
                    >
                        <Plus className="w-6 h-6" />
                        <span className="text-lg font-medium">Add Zone</span>
                    </button>
                )}
            </div>


            {isAdding && (
                <div className="bg-blue-50 border-2 border-blue-600 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-4">Add New Zone</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-base font-medium text-neutral-700 mb-2">
                                Zone Name <span className="text-red-700">*</span>
                            </label>
                            <input
                                type="text"
                                value={draftName}
                                onChange={(e) => {
                                    setDraftName(e.target.value);
                                    setIsInputEmpty(false);
                                }}
                                placeholder="Enter zone name"
                                className="w-full px-4 py-3 text-lg border-2 border-neutral-300 rounded-lg focus:border-blue-600 focus:outline-none bg-white"
                                autoFocus
                            />
                            {isInputEmpty && (
                                <p className="text-red-700 font-bold mt-2">Name cannot be empty</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-base font-medium text-neutral-700 mb-2">
                                Description
                            </label>
                            <input
                                type="text"
                                value={draftDescription}
                                onChange={(e) => setDraftDescription(e.target.value)}
                                placeholder="Enter description"
                                className="w-full px-4 py-3 text-lg border-2 border-neutral-300 rounded-lg focus:border-blue-600 focus:outline-none bg-white"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleAdd}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white rounded-lg transition-colors text-lg font-medium cursor-pointer active:brightness-90"
                            >
                                <Save className="w-5 h-5" />
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-neutral-200 text-neutral-900 rounded-lg transition-colors text-lg font-medium cursor-pointer active:brightness-90"
                            >
                                <X className="w-5 h-5" />
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {zones.map((zone) => (
                    <div
                        key={zone.id}
                        className="bg-white border-2 border-neutral-200 rounded-xl p-6"
                    >
                        {editingId === zone.id ? (
                            <div className="space-y-4">
                                <div>
                                    <label
                                        htmlFor={`input-name-${zone.id}`}
                                        className="block text-base font-medium text-neutral-700 mb-2"
                                    >
                                        Zone Name <span className="text-red-700">*</span>
                                    </label>
                                    <input
                                        id={`input-name-${zone.id}`}
                                        type="text"
                                        value={draftName}
                                        onChange={(e) => {
                                            setDraftName(e.target.value);
                                            setIsInputEmpty(false);
                                        }}
                                        className="w-full px-4 py-3 text-lg border-2 border-neutral-300 rounded-lg focus:border-blue-600 focus:outline-none bg-white"
                                        autoFocus
                                    />
                                    {isInputEmpty && (
                                        <p className="text-red-700 font-bold mt-2">Name cannot be empty</p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor={`input-desc-${zone.id}`}
                                        className="block text-base font-medium text-neutral-700 mb-2"
                                    >
                                        Description
                                    </label>
                                    <input
                                        id={`input-desc-${zone.id}`}
                                        type="text"
                                        value={draftDescription}
                                        onChange={(e) => setDraftDescription(e.target.value)}
                                        className="w-full px-4 py-3 text-lg border-2 border-neutral-300 rounded-lg focus:border-blue-600 focus:outline-none bg-white"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={handleSave}
                                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white rounded-lg transition-colors text-lg font-medium cursor-pointer active:brightness-90"
                                    >
                                        <Save className="w-5 h-5" />
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-neutral-200 text-neutral-900 rounded-lg transition-colors text-lg font-medium cursor-pointer active:brightness-90"
                                    >
                                        <X className="w-5 h-5" />
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold text-neutral-900">{zone.name}</div>
                                    <div className="text-lg text-neutral-600 mt-1">{zone.description}</div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleEdit(zone.id, zone.name, zone.description)}
                                        className="p-3 rounded-lg transition-colors cursor-pointer active:brightness-90"
                                        aria-label="Edit"
                                    >
                                        <Edit2 className="w-6 h-6 text-blue-600" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(zone.id)}
                                        className="p-3 rounded-lg transition-colors cursor-pointer active:brightness-90"
                                        aria-label="Delete"
                                    >
                                        <Trash2 className="w-6 h-6 text-red-600" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {zones.length === 0 && !isAdding && (
                <div className="text-center py-16">
                    <h3 className="text-2xl font-bold text-neutral-400 mb-2">No zones yet</h3>
                    <p className="text-lg text-neutral-400">Add your first zone to get started</p>
                </div>
            )}

            {deleteId && (
                <ConfirmDeleteModal
                    open={!!deleteId}
                    title="Delete Zone"
                    message={`Are you sure you want to delete "${deleteZoneName}"?`}
                    onClose={closeDelete}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
}

export default Zones;
