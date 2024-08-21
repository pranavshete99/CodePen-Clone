import React, {useState} from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/css/css'
import 'codemirror/mode/javascript/javascript'
import {Controlled as ControlledEditor} from 'react-codemirror2'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCompressAlt, faExpandAlt} from '@fortawesome/free-solid-svg-icons'


function Editor(props) {

    const {
        displayName,
        value,
        language,
        onChange
    } = props

    const [open, setOpen] = useState(true)

    function handleChange(editor, data, value){
        onChange(value)
    }

  return (
    <div className={`flex flex-col p-[.5rem] ${open ? 'flex-grow' : 'flex-grow-0'}`}>
      <div className='flex justify-between bg-[#1b1d26] text-white py-2 pr-2 pl-4 rounded-t-md'>
        {displayName}
        <button
          type='button'
          className='ml-[1rem] border-none text-white cursor-pointer'
          onClick={() => setOpen(prevOpen => !prevOpen)}
        >
          <FontAwesomeIcon 
            icon={open ? faCompressAlt : faExpandAlt}
          />
        </button>
      </div>
      <ControlledEditor 
        onBeforeChange={handleChange}
        value = {value}
        className='flex-grow rounded-b-md overflow-hidden'
        options = {{
            lineWrapping: true,
            lint: true,
            mode: language,
            lineNumbers: true,
            theme: 'material'
        }}
      />
    </div>
  )
}

export default Editor
