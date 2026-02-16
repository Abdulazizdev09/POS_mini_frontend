import { useEffect, useMemo, useState } from "react"
import { Edit2, Plus, Save, Trash2, X } from "lucide-react"
import type { ZoneDto } from "../../types/zone"
import { getZones } from "../../api/zones/getZones"
import type { TableDto } from "../../types/tables"
import { updateTable } from "../../api/tables/updateTable"
import ConfirmDeleteModal from "./components/ConfirmDeleteModal"
import { softDeleteTable } from "../../api/tables/softDeleteTable"
import { createTable } from "../../api/tables/createTable"

function Tables() {
  const [zones, setZones] = useState<ZoneDto[]>([])
  const [loading, setLoading] = useState(true)

  const [isNameInputEmpty, setIsNameInputEmpty] = useState(false)
  const [isCapacityWrong, setIsCapacityWrong] = useState(false)
  const [isZoneIdEmpty, setIsZoneIdEmpty] = useState(false)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [draftName, setDraftName] = useState<string>("")
  const [draftCapacity, setDraftCapacity] = useState<string>("")
  const [draftZoneId, setDraftZoneId] = useState<string>("")

  const [isAdding, setIsAdding] = useState(false);


  const fetchZones = async () => {
    setLoading(true)
    try {
      const data = await getZones()
      setZones(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchZones()
  }, [])

  const tables = useMemo(() => {
    return zones.flatMap((z) =>
      (z.tables ?? []).map((t) => ({
        ...t,
        zoneName: z.name
      }))
    )
  }, [zones])

  const handleEdit = (table: TableDto) => {
    setIsAdding(false)
    setEditingId(table.id)
    setDraftName(table.name)
    setDraftCapacity(String(table.capacity))
    setDraftZoneId(table.zoneId)
    setIsNameInputEmpty(false)
    setIsCapacityWrong(false)
    setIsZoneIdEmpty(false)
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
    setDraftName("")
    setDraftCapacity("")
    setDraftZoneId("")
    setIsNameInputEmpty(false)
    setIsCapacityWrong(false)
    setIsZoneIdEmpty(false)
  }

  const handleSave = async () => {
    if (!editingId) return

    const name = draftName.trim()
    const capacity = Number(draftCapacity.trim())
    const zoneId = draftZoneId.trim()

    if (name === "") {
      setIsNameInputEmpty(true)
      return
    }

    if (isNaN(capacity) || capacity <= 0) {
      setIsCapacityWrong(true)
      return
    }

    if (!zoneId) {
      setIsZoneIdEmpty(true)
      return
    }

    try {
      await updateTable(editingId, { name, capacity, zoneId })
      await fetchZones()
    } catch (error) {
      console.log(error)
    } finally {
      handleCancel()
    }
  }

  const handleDelete = (tableId: string) => {
    setDeleteId(tableId)
  }

  const closeDelete = () => {
    setDeleteId(null)
  }

  const confirmDelete = async () => {
    if (!deleteId) return

    try {
      await softDeleteTable(deleteId)
      await fetchZones()
    } catch (error) {
      console.log(error)
    } finally {
      closeDelete()
    }
  }

  const openAdd = () => {
    setEditingId(null)
    setIsAdding(true)

    setDraftName("")
    setDraftCapacity("")
    setDraftZoneId("")

    setIsNameInputEmpty(false)
    setIsCapacityWrong(false)
    setIsZoneIdEmpty(false)
  }


  const handleAdd = async () => {
    const name = draftName.trim();
    const capacity = Number(draftCapacity.trim());
    const zoneId = draftZoneId.trim();

    if (name === "") {
      setIsNameInputEmpty(true)
      return
    }

    if (isNaN(capacity) || capacity <= 0) {
      setIsCapacityWrong(true)
      return
    }

    if (!zoneId) {
      setIsZoneIdEmpty(true)
      return
    }

    try {
      await createTable({ name, capacity, zoneId })
      await fetchZones();
      setIsAdding(false);   // close add form
      handleCancel();
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) return <div className="p-8">Loading Tables...</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Tables</h2>
          <p className="text-lg text-neutral-600 mt-1">
            {tables.length} table{tables.length !== 1 ? "s" : ""}
          </p>
        </div>

        {!isAdding && !editingId && (
          <button
            onClick={openAdd}
            className="flex items-center gap-3 px-6 py-4 bg-neutral-900 text-white rounded-lg transition-colors cursor-pointer active:brightness-90"
          >
            <Plus className="w-6 h-6" />
            <span className="text-lg font-medium">Add Table</span>
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-blue-50 border-2 border-blue-600 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-neutral-900 mb-4">Add New Table</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-base font-medium text-neutral-700 mb-2">
                Table Name <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                value={draftName}
                onChange={(e) => {
                  setDraftName(e.target.value);
                  setIsNameInputEmpty(false);
                }}
                placeholder="Enter zone name"
                className="w-full px-4 py-3 text-lg border-2 border-neutral-300 rounded-lg focus:border-blue-600 focus:outline-none bg-white"
                autoFocus
              />
              {isNameInputEmpty && (
                <p className="text-red-700 font-bold mt-2">Name cannot be empty</p>
              )}
            </div>

            <div>
              <label className="block text-base font-medium text-neutral-700 mb-2">
                Capacity
              </label>
              <input
                type="number"
                value={draftCapacity}
                onChange={(e) => {
                  setDraftCapacity(e.target.value)
                  setIsCapacityWrong(false)
                }}
                placeholder="Enter capacity (at least 1)"
                className="w-full px-4 py-3 text-lg border-2 border-neutral-300 rounded-lg focus:border-blue-600 focus:outline-none bg-white"
              />
              {isCapacityWrong && (
                <p className="text-red-600 font-bold mt-2">
                  Capacity cannot be smaller than 0
                </p>
              )}
            </div>

            <div>
              <label className="block text-base font-medium text-neutral-700 mb-2">
                Zone Location <span className="text-red-600">*</span>
              </label>

              {isZoneIdEmpty && (
                <p className="text-red-600 font-bold mb-2">
                  Select a zone
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                {zones.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => {
                      setDraftZoneId(zone.id)
                      setIsZoneIdEmpty(false)
                    }}
                    className={
                      draftZoneId === zone.id
                        ? "px-3 py-2 bg-green-600 text-white rounded-lg"
                        : "px-3 py-2 bg-neutral-200 rounded-lg"
                    }
                  >
                    {zone.name}
                  </button>
                ))}
              </div>
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
        {tables.map((table) =>
          editingId === table.id ? (
            <div
              key={table.id}
              className="bg-white border-2 border-neutral-200 rounded-xl p-6"
            >
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-base font-medium text-neutral-700 mb-2">
                    Name <span className="text-red-600">*</span>
                  </label>

                  <input
                    type="text"
                    value={draftName}
                    onChange={(e) => {
                      setDraftName(e.target.value)
                      setIsNameInputEmpty(false)
                    }}
                    className="w-full px-4 py-3 text-lg border-2 border-neutral-300 rounded-lg focus:border-blue-600 focus:outline-none bg-white"
                    autoFocus
                  />

                  {isNameInputEmpty && (
                    <p className="text-red-600 font-bold mt-2">
                      Name cannot be empty
                    </p>
                  )}
                </div>

                {/* Capacity */}
                <div>
                  <label className="block text-base font-medium text-neutral-700 mb-2">
                    Capacity <span className="text-red-600">*</span>
                  </label>

                  <input
                    type="number"
                    value={draftCapacity}
                    onChange={(e) => {
                      setDraftCapacity(e.target.value)
                      setIsCapacityWrong(false)
                    }}
                    className="w-full px-4 py-3 text-lg border-2 border-neutral-300 rounded-lg focus:border-blue-600 focus:outline-none bg-white"
                  />

                  {isCapacityWrong && (
                    <p className="text-red-600 font-bold mt-2">
                      Capacity cannot be smaller than 0
                    </p>
                  )}
                </div>

                {/* Zone */}
                <div>
                  <label className="block text-base font-medium text-neutral-700 mb-2">
                    Zone Location <span className="text-red-600">*</span>
                  </label>

                  {isZoneIdEmpty && (
                    <p className="text-red-600 font-bold mb-2">
                      Select a zone
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {zones.map((zone) => (
                      <button
                        key={zone.id}
                        onClick={() => {
                          setDraftZoneId(zone.id)
                          setIsZoneIdEmpty(false)
                        }}
                        className={
                          draftZoneId === zone.id
                            ? "px-3 py-2 bg-green-600 text-white rounded-lg"
                            : "px-3 py-2 bg-neutral-200 rounded-lg"
                        }
                      >
                        {zone.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="flex-1 px-6 py-4 bg-green-600 text-white rounded-lg text-lg font-medium active:brightness-90"
                  >
                    Save
                  </button>

                  <button
                    onClick={handleCancel}
                    className="flex-1 px-6 py-4 bg-neutral-200 text-neutral-900 rounded-lg text-lg font-medium active:brightness-90"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              key={table.id}
              className="bg-white border-2 border-neutral-200 rounded-xl p-6 flex items-center justify-between"
            >
              <div>
                <div className="text-2xl font-bold text-neutral-900">
                  {table.name}
                </div>
                <div className="text-lg text-neutral-600 mt-1">
                  Capacity: {table.capacity}
                </div>
                <div className="text-lg text-neutral-600">
                  Zone: {table.zoneName}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(table)}
                  className="p-3 rounded-lg active:brightness-90"
                >
                  <Edit2 className="w-6 h-6 text-blue-600" />
                </button>

                <button
                  onClick={() => handleDelete(table.id)}
                  className="p-3 rounded-lg active:brightness-90"
                >
                  <Trash2 className="w-6 h-6 text-red-600" />
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {deleteId && (
        <ConfirmDeleteModal
          open={!!deleteId}
          title="Delete Table"
          message="Are you sure you want to delete this?"
          onConfirm={confirmDelete}
          onClose={closeDelete}
        />
      )}

    </div>
  )
}

export default Tables
