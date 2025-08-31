const { connectDb } = require("@/DatabaseConnection");

export async function createTable() {
    try {
        const SQLquery = `CREATE TABLE IF NOT EXISTS schoolTable (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        address VARCHAR(100),
        city VARCHAR(100),
        state VARCHAR(100),
        contact VARCHAR(14),
        image VARCHAR(500),
        email_id VARCHAR(500)
        );`

        let dbConnection = await connectDb();
        let res = await dbConnection.query(SQLquery);
        console.log("result in Model : ", res)
    } catch (error) {
        console.log(error);

    }
}