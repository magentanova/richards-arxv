import React, { useCallback, useState } from 'react';

import SelectGroup from '../SelectGroup';
import withLoader from '../hoc/withLoader';
import { API_ROOT } from '../../settings';

import "./index.css";

const NEW_CATEGORY = "New Category";
const MEDIA_TYPES = ["photo", "video"];
const UPLOAD_URL = `${API_ROOT}/upload`;

const Uploader = props => {
    const [ categories, setCategories ] = useState(
        props.categories
    )
    const displayCategories = categories.sort().concat([NEW_CATEGORY])

    const [ year, setYear ] = useState(undefined);
    const [ category, setCategory ] = useState(undefined);
    const [ type, setType ] = useState(undefined);
    const [ order, setOrder ] = useState(undefined);
    const [ title, setTitle ] = useState(undefined);
    const [ file, setFile ] = useState(undefined);

    const handleOrderInput = useCallback(e => {
        setOrder(e.target.value);
    }, []);
    const handleTitleInput = useCallback(e => setTitle(e.target.value), [])

    const handleCategoryInput = e => {
        if (e.keyCode === 13) /* enter*/ {
            setCategories(categories.concat([e.target.value]))
            setCategory(e.target.value)
            e.target.value = '';
        }
    }

    const handleFileUpload = e => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = e => {
        const formData = new FormData();
        formData.append("year", year);
        formData.append("category", category);
        formData.append("type", type);
        formData.append("order", order);
        formData.append("title", title);
        formData.append("filename", file.name);
        formData.append("file", file);
        fetch(UPLOAD_URL, {
            method: "POST",
            body: formData
        })
        .then(
            resp => resp.json(),
            err => console.error(err)
        )
        .then(
            resp => {
                alert("success!");
            }
        )
    };

    const showFileUpload = 
        year !== undefined &&
        category !== undefined &&
        category !== NEW_CATEGORY && 
        type !== undefined &&
        order !== undefined;

    const showSubmitButton = showFileUpload && file !== undefined;

    return (
        <div className="upload-container">
            <SelectGroup 
                label="Year"
                selectId="year-select" 
                options={[...Array(100).keys()].map(i => i + 2018)}
                onSelect={setYear}
                selected={year}
            />
            <SelectGroup 
                label="Category"
                selectId="category-select" 
                options={displayCategories}
                onSelect={setCategory}
                selected={category}
            />
            <input 
                style={{display: 
                    category === NEW_CATEGORY ? 
                        "block" :
                        "none"
                }}
                onKeyUp={handleCategoryInput} />
            <SelectGroup
                label="Type" 
                selectId="type-select" 
                options={MEDIA_TYPES}
                onSelect={setType}
                selected={type}
            />
            <div className="input-group order">
                <label htmlFor="order">Sequence order: </label>
                <input onChange={handleOrderInput} type="number" id="order" />
            </div>
            <div className="input-group title">
                <label htmlFor="title">Custom title (optional): </label>
                <input onChange={handleTitleInput} id="title" />
            </div>
            <input 
                style={{display: showFileUpload ? "block" : "none"}}
                onChange={handleFileUpload}
                type="file"/>
            <button 
                disabled={!showSubmitButton}
                onClick={handleSubmit}
            >Upload!</button>
        </div>
    );
}

export default withLoader(Uploader);