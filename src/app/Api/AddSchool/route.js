import { connectDb } from "@/DatabaseConnection";
import { createTable } from "@/Models/table";
import { writeFileSync } from "fs";
// import { writeFileSync } from "fs";
import { writeFile } from 'fs/promises'
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request) {
    try {
        let db = await connectDb();
        await createTable();

        let requestData = await request.formData();
        let name = requestData.get('name');
        let address = requestData.get('address');
        let city = requestData.get('city');
        let state = requestData.get('state');
        let contact = requestData.get('contact');
        let email = requestData.get('email')
        let file = requestData.get('image');

        if (!file) {
            return NextResponse.json({ "Status": "False", "Message": "Image Not Found" }, { status: 404 })
        }

        const ImageName = `/Images/${Date.now()}+${file.name}`
        const byteData = await file.arrayBuffer();
        const buffer = Buffer.from(byteData);

        const filepath = path.join("public",ImageName)
        writeFileSync(filepath, buffer);

        let res = await db.execute("INSERT INTO schoolTable (name, address, city, state, contact, image, email_id ) VALUES (?, ?, ?, ?, ?, ?, ?)", [name, address, city, state, contact, ImageName, email])

        return NextResponse.json({ "Status": "True", "Message": 'Data Is Inserted', "result": res }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ "Status": "False", 'error': "Internal Server Error", error: error }, { status: 500 })
    }
}
