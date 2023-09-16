import { writeFile } from "fs/promises"

export const POST = async (req, res) => {
    const formData = req.formData()
    const file = formData.get('file')
    const id = formData.get('id')
    const buffer = Buffer.from(await file.arrayBuffer())
    console.log(filename)
    try {
        await writeFile(
            path.join(process.cwd(), `public/profile/${id}` + filename), buffer
        )
    } catch (e) {}
}