const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}
const args = process.argv;
const password = args[2]
const name = args[3];
const number = args[4];

const url =
    `mongodb+srv://AdminDiego:${password}@firstcluster.zlv30.mongodb.net/phonebook?retryWrites=true&w=majority&appName=FirstCluster`

mongoose.set('strictQuery',false)

mongoose.connect(url)
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema, 'persons')
if(name !=undefined && number !=undefined){

    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })

}else{
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}


