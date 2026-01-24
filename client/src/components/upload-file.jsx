'use client'

import { useRef } from 'react';
import { UploadIcon } from 'lucide-react';

const FileInputField = ({ inputFile, setInputFile, id, url }) => {

    const inputField = useRef(null)
    const handleInputFieldClick = () => {
        inputField.current.click()
    }
    const handleInputFieldChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setInputFile(file)
        }
    }
    const handleDragOver = (e) => {
        e.preventDefault()
    }
    const handleDrop = (e) => {
        e.preventDefault()
        if (e.dataTransfer?.files && e.dataTransfer?.files[0]) {
            const file = e.dataTransfer.files[0]
            setInputFile(file)
        }
    }

    return (
        <>
            <div
                id={id ? id : 'file-input'}
                onClick={handleInputFieldClick}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content h-48 w-full rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm overflow-hidden justify-center items-center"
            >
                {
                    inputFile || url
                        ? <img src={inputFile ? URL.createObjectURL(inputFile) : url} alt='Input File' className='object-cover' />
                        : (
                            <UploadIcon className='size-12'/>
                        )
                }
            </div>
            <input
                type="file"
                ref={inputField}
                onChange={handleInputFieldChange}
                style={{ display: 'none' }}
                name='itemImg'
            />
        </>
    )
}

export { FileInputField }