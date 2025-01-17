class UserController {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async getAllUsers(req, res) {
        try {
            const users = await this.userModel.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await this.userModel.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createUser(req, res) {
        const { firstName, lastName, email } = req.body;
        if (!firstName || !lastName || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (!isNaN(firstName)) {
            return res.status(400).json({ message: 'First name cannot contain numbers' });
        }
        try {
            const newUser = await this.userModel.create({ firstName, lastName, email });
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        const { id } = req.params;
        const { firstName, lastName, email } = req.body;
        try {
            const updatedUser = await this.userModel.findByIdAndUpdate(id, { firstName, lastName, email }, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const deletedUser = await this.userModel.findByIdAndDelete(id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default UserController;