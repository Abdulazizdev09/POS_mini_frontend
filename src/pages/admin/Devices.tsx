import { useEffect, useState } from "react"
import { Edit2, Plus, Save, Trash2, X } from "lucide-react"
import type { DeviceDto } from "../../types/device"
import { getDevices } from "../../api/devices/getDevices"
import type { TableDto } from "../../types/tables"
import { getTables } from "../../api/tables/getTables"
import ConfirmDeleteModal from "./components/ConfirmDeleteModal"
import { createDevice } from "../../api/devices/createDevice"
import { updateDevice } from "../../api/devices/updateDevice"
import { softDeleteDevice } from "../../api/devices/softDeleteDevice"

function Devices() {
    const [devices, setDevices] = useState<DeviceDto[]>([])
    const [tables, setTables] = useState<TableDto[]>([]);
    const [loading, setLoading] = useState(true)

    const [editingId, setEditingId] = useState<string | null>(null)
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [isAdding, setIsAdding] = useState(false)

    // Form states
    const [draftName, setDraftName] = useState("")
    const [selectedTableId, setSelectedTableId] = useState<string | null>(null)

    // Validation states
    const [isNameEmpty, setIsNameEmpty] = useState(false)

    const fetchData = async () => {
        try {
            setLoading(true)
            const [devicesData, tablesData] = await Promise.all([
                getDevices(),
                getTables()
            ])
            setDevices(devicesData)
            setTables(tablesData)
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleEdit = (device: DeviceDto) => {
        setIsAdding(false)
        setEditingId(device.id)
        setDraftName(device.name)
        setSelectedTableId(device.tableId || null)

        setIsNameEmpty(false)
    }

    const handleCancel = () => {
        setIsAdding(false)
        setEditingId(null)
        setDraftName("")
        setSelectedTableId(null)
        setIsNameEmpty(false)
    }

    const handleSave = async () => {
        if (!editingId) return

        if (!draftName.trim()) {
            setIsNameEmpty(true)
            return
        }

        try {
            await updateDevice(editingId, {
                name: draftName,
                tableId: selectedTableId
            })
            await fetchData()
            handleCancel()
        } catch (error) {
            console.log(error)
        }
    }

    const handleAdd = async () => {
        if (!draftName.trim()) {
            setIsNameEmpty(true)
            return
        }

        try {
            await createDevice({
                name: draftName,
                tableId: selectedTableId || undefined
            })
            await fetchData()
            handleCancel()
        } catch (error) {
            console.log(error)
        }
    }

    const openAdd = () => {
        setEditingId(null)
        setIsAdding(true)
        setDraftName("")
        setSelectedTableId(null)
        setIsNameEmpty(false)
    }

    const handleDelete = (id: string) => {
        setDeleteId(id)
    }

    const confirmDelete = async () => {
        if (!deleteId) return
        try {
            await softDeleteDevice(deleteId)
            await fetchData()
        } catch (error) {
            console.log(error)
        } finally {
            setDeleteId(null)
        }
    }

    console.log(devices);

    if (loading) return <div className="p-8">Loading Devices...</div>


    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-neutral-900">Devices</h2>
                    <p className="text-lg text-neutral-600 mt-1">
                        {devices.length} device{devices.length !== 1 ? "s" : ""}
                    </p>
                </div>

                {!isAdding && !editingId && (
                    <button
                        onClick={openAdd}
                        className="flex items-center gap-3 px-6 py-4 bg-neutral-900 text-white rounded-lg transition-colors cursor-pointer active:brightness-90"
                    >
                        <Plus className="w-6 h-6" />
                        <span className="text-lg font-medium">Add Device</span>
                    </button>
                )}
            </div>

            {/* Add Form */}
            {isAdding && (
                <div className="bg-blue-50 border-2 border-blue-600 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-4">Add New Device</h3>
                    <div className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-base font-medium text-neutral-700 mb-2">
                                Device Name <span className="text-red-700">*</span>
                            </label>
                            <input
                                type="text"
                                value={draftName}
                                onChange={(e) => {
                                    setDraftName(e.target.value)
                                    setIsNameEmpty(false)
                                }}
                                placeholder="Enter device name"
                                className="w-full px-4 py-3 text-lg border-2 border-neutral-300 rounded-lg focus:border-blue-600 focus:outline-none bg-white"
                                autoFocus
                            />
                            {isNameEmpty && <p className="text-red-700 font-bold mt-2">Name cannot be empty</p>}
                        </div>

                        {/* Table Selection */}
                        <div>
                            <label className="block text-base font-medium text-neutral-700 mb-2">
                                Assigned Table
                            </label>
                            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                                <button
                                    onClick={() => setSelectedTableId(null)}
                                    className={
                                        selectedTableId === null
                                            ? "px-3 py-2 bg-green-600 text-white rounded-lg transition-colors"
                                            : "px-3 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
                                    }
                                >
                                    None
                                </button>
                                {tables.map((table) => (
                                    <button
                                        key={table.id}
                                        onClick={() => setSelectedTableId(table.id)}
                                        className={
                                            selectedTableId === table.id
                                                ? "px-3 py-2 bg-green-600 text-white rounded-lg transition-colors"
                                                : "px-3 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
                                        }
                                    >
                                        {table.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-6">
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

            {/* List */}
            <div className="space-y-4">
                {devices.map((device) =>
                    editingId === device.id ? (
                        <div key={device.id} className="bg-white border-2 border-neutral-200 rounded-xl p-6">
                            <div className="space-y-4">
                                {/* Name */}
                                <div>
                                    <label className="block text-base font-medium text-neutral-700 mb-2">
                                        Device Name <span className="text-red-700">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={draftName}
                                        onChange={(e) => {
                                            setDraftName(e.target.value)
                                            setIsNameEmpty(false)
                                        }}
                                        className="w-full px-4 py-3 text-lg border-2 border-neutral-300 rounded-lg focus:border-blue-600 focus:outline-none bg-white"
                                    />
                                    {isNameEmpty && <p className="text-red-700 font-bold mt-2">Name cannot be empty</p>}
                                </div>

                                {/* Table - Chips Style */}
                                <div>
                                    <label className="block text-base font-medium text-neutral-700 mb-2">
                                        Location (Table)
                                    </label>
                                    <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                                        <button
                                            onClick={() => setSelectedTableId(null)}
                                            className={
                                                selectedTableId === null
                                                    ? "px-3 py-2 bg-green-600 text-white rounded-lg transition-colors"
                                                    : "px-3 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
                                            }
                                        >
                                            None
                                        </button>
                                        {tables.map((table) => (
                                            <button
                                                key={table.id}
                                                onClick={() => setSelectedTableId(table.id)}
                                                className={
                                                    selectedTableId === table.id
                                                        ? "px-3 py-2 bg-green-600 text-white rounded-lg transition-colors"
                                                        : "px-3 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
                                                }
                                            >
                                                {table.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3 mt-4">
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
                        </div>
                    ) : (
                        <div key={device.id} className="bg-white border-2 border-neutral-200 rounded-xl p-6 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-neutral-900">{device.name}</h3>
                                <div className="mt-2 flex gap-2">
                                    <span className={`px-2 py-1 rounded text-sm font-medium ${device.deviceStatus === 'ONLINE' ? 'bg-green-100 text-green-800' :
                                        device.deviceStatus === 'OFFLINE' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                        {device.deviceStatus}
                                    </span>
                                    {device.table ? (
                                        <span className="px-2 py-1 rounded text-sm font-medium bg-blue-100 text-blue-800">
                                            Table: {device.table.name}
                                        </span>
                                    ) : (
                                        <span className="px-2 py-1 rounded text-sm font-medium bg-neutral-100 text-neutral-600">
                                            No Table
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleEdit(device)}
                                    className="p-3 rounded-lg active:brightness-90 hover:bg-neutral-100"
                                >
                                    <Edit2 className="w-6 h-6 text-blue-600" />
                                </button>
                                <button
                                    onClick={() => handleDelete(device.id)}
                                    className="p-3 rounded-lg active:brightness-90 hover:bg-neutral-100"
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
                    title="Delete Device"
                    message="Are you sure you want to delete this device?"
                    onConfirm={confirmDelete}
                    onClose={() => setDeleteId(null)}
                />
            )}
        </div>
    )
}

export default Devices