const Notification = ({ errormessage,successmessage }) => {
  if (errormessage === '' && successmessage==='') {
    return null
  }
  if(errormessage==='')
    return <div className="success">{successmessage}</div>
    else
  return <div className="error">{errormessage}</div>
}

export default Notification