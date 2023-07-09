import React, { FC, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
interface imageUploadProps{
  value?: string
  disabled?: boolean;
  onChange: (base64: string)=>void;
  label: string;
}
export const ImageUpload: FC<imageUploadProps> = ({
  value,
  disabled,
  onChange,
  label
  
}) => {
  const [base64, setBase64] = useState(value);

  const handleChange = useCallback((base: string)=>{
    onChange(base);
  }, [onChange])

  const handleDrop = useCallback((files: any)=>{
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event: any)=>{
      setBase64(event.target.result)
      handleChange(event.target.result)
    }
    reader.readAsDataURL(file);

  }, [handleChange]);

  const {getRootProps, getInputProps} = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {'image/jpeg': [], 'image/png': []}
  })

  return (
    <div {...getRootProps({ className: 'w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700 cursor-pointer'})}>
      <input {...getInputProps()}/>
        {base64  ? (<div className='flex items-center justify-center'>
        <Image  src={base64} height={100} width={100} alt={"Uploaded Image"}/>
        </div>) : (<p className='text-white'> {label}</p>)}
    </div>
  )
}
