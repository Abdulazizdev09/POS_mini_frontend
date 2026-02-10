import { useEffect, useState } from "react";
import type { ZoneDto } from "../../types/zone";
import { getZones } from "../../api/zones/getZones";
import ZoneCard from "./components/ZoneCard";
import { updateZone } from "../../api/zones/updateZone";
import { createZone } from "../../api/zones/createZone";
import { softDeleteZone } from "../../api/zones/softDeleteZone";
import EditZoneModal from "./components/EditZoneModal";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import CreateZoneCard from "./components/CreateZoneCard";

export default function Zones() {
    const [zones, setZones] = useState<ZoneDto[]>([]);
    const [loading, setLoading] = useState(true);


    const [editOpen, setEditOpen] = useState(false);
    const [selectedZone, setSelectedZone] = useState<ZoneDto | null>(null)

    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [draft, setDraft] = useState({ name: "", description: "" })


    useEffect(() => {
        getZones()
            .then(setZones)
            .catch((e) => console.log(e.message || "Failed to load zones"))
            .finally(() => setLoading(false));
    }, []);

    const openEdit = (zone: ZoneDto) => {
        setSelectedZone(zone)
        setDraft({
            name: zone.name ?? "",
            description: zone.description ?? "",
        })

        setEditOpen(true);
    }

    const openCreate = () => {
        setSelectedZone(null);
        setDraft({ name: "", description: "" });
        setEditOpen(true);
    };

    const closeEdit = () => {
        setEditOpen(false)
        setSelectedZone(null);
    }

    const handleSave = async () => {
        try {
            if (selectedZone) {
                await updateZone(selectedZone.id, {
                    name: draft.name.trim(),
                    description: draft.description.trim(),
                });
            } else {
                await createZone({
                    name: draft.name.trim(),
                    description: draft.description.trim(),
                });
            }
            const fresh = await getZones();
            setZones(fresh);
            closeEdit();
        } catch (e) {
            console.error(e);
            alert("Failed to save zone");
        }
    }

    const handleDelete = (id: string) => {
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;
        try {
            await softDeleteZone(deleteId);
            const fresh = await getZones();
            setZones(fresh);
        } catch (e) {
            console.error(e);
            alert("Failed to delete zone");
        } finally {
            setDeleteId(null)
        }
    };

    if (loading) return <p>Loading POS Zones...</p>
    return (
        <div className="mx-15 h-full ">
            <h2 className="text-3xl font-extrabold mb-5">Zones</h2>

            <div className="flex flex-wrap gap-10 ">
                <CreateZoneCard onClick={openCreate} />
                {zones.map((z) => (
                    <ZoneCard
                        key={z.id}
                        zone={z}
                        onDelete={() => handleDelete(z.id)}
                        onEdit={() => openEdit(z)} />
                ))}
                <EditZoneModal
                    open={editOpen}
                    title={selectedZone ? "Change Zone Info" : "Create New Zone"}
                    value={draft}
                    onChange={setDraft}
                    onClose={closeEdit}
                    onSave={handleSave}
                />
                <ConfirmDeleteModal
                    open={!!deleteId}
                    onClose={() => setDeleteId(null)}
                    onConfirm={confirmDelete}
                />
            </div>
        </div>
    );
}
