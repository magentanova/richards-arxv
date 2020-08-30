import React, { useCallback, useState } from 'react';

import SelectGroup from '../SelectGroup';
import withLoader from '../hoc/withLoader';
import { API_ROOT } from '../../settings';
import { getAllCategories } from '../../utils';

const NEW_CATEGORY = "New Category";
const MEDIA_TYPES = ["photo", "video"];
const UPLOAD_URL = `${API_ROOT}/upload`;

const Uploader = props => {
    const [ categories, setCategories ] = useState(
        getAllCategories(props.s3Objects)
    )
    const displayCategories = categories.sort().concat([NEW_CATEGORY])

    const [ year, setYear ] = useState(undefined);
    const [ category, setCategory ] = useState(undefined);
    const [ type, setType ] = useState(undefined);
    const [ order, setOrder ] = useState(undefined);
    const [ title, setTitle ] = useState(undefined);

    const handleOrderInput = useCallback(e => setOrder(e.target.value), []);
    const handleTitleInput = useCallback(e => setTitle(e.target.value), [])

    const handleCategoryInput = e => {
        if (e.keyCode === 13) /* enter*/ {
            setCategories(categories.concat([e.target.value]))
            setCategory(e.target.value)
            e.target.value = '';
        }
    }

    const handleFileUpload = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = event => {
            const requestBody = {
                year,
                category,
                type,
                order,
                title,
                body: event.target.result,
                filename: file.name
            };
            fetch(UPLOAD_URL, {
                headers: {
                    'Content-Type': 'application/json'
                  },
                method: "POST",
                body: JSON.stringify(requestBody)
            })
            .then(
                resp => resp.json(),
                err => console.error(err)
            )
            .then(
                resp => {
                    alert("success!");
                    console.log(resp)
                }
            )
        };
        reader.readAsDataURL(file);
    }

    const showFileUpload = 
        year !== undefined &&
        category !== undefined &&
        type !== undefined &&
        order !== undefined

    return (
        <div>
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

        </div>
    );
}

export default withLoader(Uploader);