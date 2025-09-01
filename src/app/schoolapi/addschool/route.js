import { connectDb } from "@/DatabaseConnection";
import { createTable } from "@/Models/table";
// import { v2 } from "cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { writeFileSync } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request) {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });


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


        const byteData = await file.arrayBuffer();
        const buffer = Buffer.from(byteData);

        const fileBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;
        const uploadCloudRes = await cloudinary.uploader.upload(fileBase64, { folder: "schoolImages" })


        let res = await db.execute("INSERT INTO schoolTable (name, address, city, state, contact, image, email_id ) VALUES (?, ?, ?, ?, ?, ?, ?)", [name, address, city, state, contact, uploadCloudRes.secure_url, email])


        return NextResponse.json({ "Status": "True", "Message": 'Data Is Inserted', "result": res }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ "Status": "False", 'error': "Internal Server Error", error: error }, { status: 500 })
    }
}
