
let users = [{
    id: 1,
    user: '',
    age: 18,
    email: "john@gmail.com"
},];

export const getUser = (req, res) => {
    for (let u of users) {
        if (u.id == req.params.id) {
            res.status(200).send(u);
            return;
        }
    }
    res.status(404).json({ message: "The user id was not found"});
}

export const getAllUser = (req, res) => {
    if (users.length == 0) {
        return res.status(404).json({ message: "No data users" })
    }
    res.status(200).send(users);
}

export const addUser = (req, res) => {
    const { id, name, email, age } = req.body;

    if(!id || !name || !email || !age){
        return res.status(400).json({ error: 'Missing fields' });
    }

    const addUser = {id, name, email, age};
    users.push(addUser);

    res.status(201).json({user: addUser});
}

export const editUser = (req, res) => {
    for (let u of users) {
        if (u.id == req.params.id) {
            u.id  = req.body.id ? req.body.id : u.id;
            u.name  = req.body.name ? req.body.name : u.name;
            u.email  = req.body.email ? req.body.email : u.email;
            u.age  = req.body.age ? req.body.age : u.age;
            return res.status(200).send("User data has been changed.");
        }
    }
    return res.status(404).json({message: "User not Found!"})
}

export const deleteUser = (req, res) => {
    const userId = req.params.id;
    const userIndex = users.findIndex((u)=> u.id===userId);

    if (userIndex !== -1) {
        users = users.filter(u => u.id != userId);
        return res.status(204).json({message: "User has been deleted."});
    }
    return res.status(404).json({message:"User ID not found."});
} 