import { connectDb } from "@/DatabaseConnection";
import { createTable } from "@/Models/table";
import { NextResponse } from "next/server";


export async function GET (request) {
    try {
        const db = await connectDb();
        let [result] = await db.execute("SELECT * FROM schoolTable");

        return NextResponse.json({'Status': 'True', 'Message': 'Date is Fetching', result }, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({"Status": "False", 'Message': 'Internal server Error', 'Error': error}, {status: 500})
    }
}