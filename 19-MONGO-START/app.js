const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demoVendredi')
    .then(() => console.log('Connected to mongo'))
    .catch((err) => console.log('Pas pu se connecter', err))

const userSchema = new mongoose.Schema({
    name: String,
    username : String,
    creation: {type: Date, default: Date.now()},
    isAdmin: Boolean,
    age: Number
})

const User = mongoose.model('User', userSchema)

async function createdUser(doc){
    const user = new User(doc)
    try {
        const result = user.save()
        // const result2 = await User.remove({})// normalement ca va tout supprimé et c'est utils pour JEST
    } catch (error) {
        // ici on peut gérer les exc les cas où la promesse échoue
    }
}
const p1 = createdUser({
    name: "Taha",
    username : "ToTo",
    isAdmin: true,
    age: 23
});
const p2 = createdUser({
    name: "Yassin",
    username : "Yaya",
    isAdmin: false,
    age: 33
});
Promise.all([p1.p2]).then(async () => {
    const all_docs = await User.find();
    console.log(all_docs);
    // GET
    const filtered_docs = await User.find({name:"Yassin"})
    console.log(filtered_docs);
    // UPDATE
    const oneUser = await User.findOne();
    console.log(oneUser);
    console.log(oneUser._id);
    oneUser.name = "MODIFIED";
    const result = await oneUser.save()
    console.log(result);
    // DELETE
    const oneUser2 = await User.findOne();
    console.log(oneUser2);
    const result2 = await oneUser2.deleteOne({_id: oneUser2._id})
    console.log(result2);

    mongoose.connection.close()
})

