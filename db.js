const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017"; // Thay bằng URL kết nối của bạn nếu sử dụng MongoDB Atlas
const client = new MongoClient(uri);

let db;

const connectToDatabase = async () => {
    try {
        await client.connect();
        db = client.db("hospital_db"); // Tên database
        console.log("Kết nối tới MongoDB thành công!");
    } catch (error) {
        console.error("Lỗi kết nối MongoDB:", error);
    }
};

const getDatabase = () => {
    if (!db) throw new Error("Database chưa được kết nối!");
    return db;
};

module.exports = { connectToDatabase, getDatabase };
