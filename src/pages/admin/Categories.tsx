import { useEffect, useState } from "react"
import type { MenuCategoryDto } from "../../types/menu"
import { getCategories } from "../../api/categories/getCategories"

function Categories() {
    const [categories, setCategories] = useState<MenuCategoryDto[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState("")

    const [draftName, setDraftName] = useState<string>("")
    const [draftDescription, setDraftDescription] = useState<string>("")


    const fetchCategories = async () => {
        try {
            const data = await getCategories()
            setCategories(data)
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])


    const handleEdit = (categoryId: string, name: string, description: string) => {
        setEditingId(categoryId)
        setDraftName(name)
        setDraftDescription(description)
    }


    if (loading) return <p>Loading Categories</p>


    return (
        <div>
            <div>Categiries</div>
            <div className="flex flex-col gap-2 items-center">
                {categories.map((c) =>
                    editingId === c.id ? (
                        <div className="w-200 border bg-gray-300 p-2">
                            <div>
                                <label htmlFor="">Name:</label>
                                <input type="text" value={draftName} />
                            </div>
                            <div>
                                <label htmlFor="">Description:</label>
                                <input type="text" value={draftDescription} />
                            </div>
                            <button className="bg-green-600 border">confirm</button>
                            <button className="bg-gray-300 border">cancel</button>
                        </div>
                    ) : (
                        <div className="w-200  border bg-gray-300 p-2 flex justify-between" >
                            <div>
                                <p>{c.name}</p>
                                <p>{c.description}</p>
                            </div>
                            <button onClick={() => handleEdit(c.id, c.name, c?.description || "")} className="p-2 bg-green-600 text-white font-bold">EDIT</button>
                        </div>
                    )
                )}
            </div>
        </div >
    )
}

export default Categories;