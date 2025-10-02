const PersonForm=({name,number,cname,cnumber,submit}) =>{
    return(
    <form onSubmit={submit}>

        <div>
          name: <input value={name} onChange={cname}/>
          </div>
          <div>
          number :<input value={number} onChange={cnumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}
export default PersonForm