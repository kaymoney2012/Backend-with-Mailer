import profileModel from "../model/profileModel.js";
// create user
export const createUser = async (req, res) => {
    try {
        const { name, email, age, country } = req.body;
        const user = await profileModel.create({
            name,
            email,
            age,
            country,
        });
        res.status(201).json({
            message: "user created successfully",
            user
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error creating user",
            error,
        });
    }
};
// get all users
export const getUsers = async (req, res) => {
    try {
        const allUsers = await profileModel.find();
        res.status(200).json({
            message: "All users gotten",
            allUsers
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error getting users",
            error
        });
    }
};
//# sourceMappingURL=profileController.js.map