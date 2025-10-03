const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI2

console.log('connecting to', url)
mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
   name: {
        type:String,
        minLength:[3,'The name must be 3 characters length minimum'],
        required:[true, 'You must enter a name']
    },
  number:{
    type:String,
    minLength:[8,'The number must 8 characters length minmium'],
    required:[true, 'You must enter a number'],
    validate:{
      validator: v => /^\d{2,3}-\d+$/.test(v),
      message:props=>`${props.value} is not a valid phone number (valid numbers eg. 09-1234556 and 040-22334455)`
    },
    

  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)