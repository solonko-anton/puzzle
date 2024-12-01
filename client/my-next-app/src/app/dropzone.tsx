'use client'
import React, { useState } from "react";
import axios from "axios";
import FileType from "./lib/types";

const Dropzone = () => {
    const [isDropped, setIsDropped] = useState<boolean>(false);
    const [file, setFile] = useState<FileType>();
    const [resposne, setResponse] = useState<bigint>();


    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDropped(true);
    }

    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDropped(false);
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if(e.dataTransfer.files){
            setFile({
                key:"file",
                file: e.dataTransfer.files
            })
        }
    }

    const fileHandler = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        const input = e.target as HTMLInputElement;
        if(input.files && input.files[0]){
            setFile({
                key: "file",
                file: input.files
            });
        }
    }

    const fileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        if (file && file.file) {
            formData.append("file", file.file[0]);
        }

        try{
            const res = await axios.post("http://127.0.0.1:8000/upload-file/", formData, {
                headers: { "Content-Type": "multipart/form-data" }
              });
            const num = res.data.result;
            const int = BigInt(num);
            setResponse(int);
        } catch(error){
            console.log(error);
        }

    }

    return (
        <div className="h-full flex justify-center items-center">
            <form method="POST" onSubmit={fileSubmit} 
                onDrop={handleDrop}>
                <div className="flex justify-center items-center flex-col">
                <div className={ `${isDropped ? "w-96 h-44 border-2 border-dashed border-blue-600 flex justify-center items-center rounded-md flex-col"
                    : "w-96 h-44 border-2 border-dashed border-black flex justify-center items-center rounded-md flex-col"
                }`}
                    onDragStart={e => dragStartHandler(e)} onDragLeave={e => dragEndHandler(e)} onDragOver={e => dragStartHandler(e)}>
                    { isDropped ? 
                    <h3>Відпустіть файл</h3>  :
                    <h3>Перетяніть файл</h3>
                    }
                    <p>або</p>
                    <span>Завантажте</span>
                    <input type="file" id="files" className="hidden" onChange={fileHandler}/>
                    <label htmlFor="files" className="bg-blue-300 text-white px-6 py-2 rounded-lg cursor-pointer
                         hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400">Вибрати файл</label>
                    {file && (
                        <ul>
                          {Array.from(file.file).map((file, id) => (
                                <li key={id}>{file.name}</li> 
                            ))}
                        </ul>
                    )}
                </div>
                <button className="bg-blue-300 text-white px-6 py-2 rounded-lg cursor-pointer
                         hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 my-3">Порахувати</button>
                </div>
                <p>Результат:</p>
                <div>
                {resposne && (
                <div>{resposne}</div>
            )}</div>
            </form>
        </div>
    );
  }
  
export default Dropzone