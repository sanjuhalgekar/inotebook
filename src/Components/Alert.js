import React from 'react'

export default function Alert(props) {
    const handleCap = (word)=>{
      if(word === "danger"){ word = "error"; }
      let capWord = word.charAt(0).toUpperCase() + word.slice(1);
      return capWord;
    }

  return (
    <div style={{height : '50px'}}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
          <strong>{handleCap(props.alert.type)} : </strong> {props.alert.msg}
      </div>}
    </div>
  )
}
