import { mysqlPool } from "../utils/connectDb.js";

export const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || latitude == null || longitude == null) {
      return res.status(400).json({
        success : false,
        error : "All fields are required"
        });
    }

    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return res.status(400).json({
            success : false, 
            error: "Latitude and Longitude must be numbers" 
        });
    }


    const query ="INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    const values = [name, address, latitude, longitude];

    const [result] = await mysqlPool.query(query, values);

    res.status(201).json({
      message: "School added successfully",
      schoolId: result.insertId,
    });
  } catch (error) {
    console.error("Error adding school:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getAllSchools = async (req, res) => {
    try {
        const [schools] = await mysqlPool.query("SELECT * FROM schools");

        if (!schools.length) {
            return res.status(200).json({
                success: true,
                message: "No School has been added yet",
                schoolsData: [],
            });
        }

        return res.status(200).json({
            success: true,
            message: "Schools Fetched Successfully!",
            schoolsData: schools,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};


export const listSchools = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;

        // Validate required parameters
        if (!latitude || !longitude) {
            return res.status(400).json({
                success: false,
                message: "Latitude and Longitude are required.",
            });
        }

        // Convert lat/lon to numbers
        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        // Fetch all schools
        const [schools] = await mysqlPool.query("SELECT id, name, latitude, longitude FROM schools");

        if (schools.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No schools found.",
                schoolsData: [],
            });
        }

        // Function to calculate distance using Haversine formula
        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const toRad = (angle) => (angle * Math.PI) / 180;
            const R = 6371; // Radius of Earth in km

            const dLat = toRad(lat2 - lat1);
            const dLon = toRad(lon2 - lon1);

            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; // Distance in km
        };

        // Calculate distance for each school and sort by proximity
        const sortedSchools = schools
            .map(school => ({
                ...school,
                distance: calculateDistance(userLat, userLon, school.latitude, school.longitude),
            }))
            .sort((a, b) => a.distance - b.distance);

        return res.status(200).json({
            success: true,
            message: "Schools sorted by proximity.",
            schoolsData: sortedSchools,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
