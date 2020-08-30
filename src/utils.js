import { API_ROOT } from './settings';

const FETCH_URL = `${API_ROOT}/list/all`;

export const fetchArchive = () => 
    fetch(FETCH_URL)
        .then(
            result => result.json(),
            err => console.log(err)
        )
        .then(
            json => parseS3Objects(json)
        );


export const getAllCategories = archive => {
    const categories = new Set();
    Object.keys(archive).forEach(year => {
        Object.keys(archive[year]).forEach(category => categories.add(category))
    })
    return Array.from(categories);
}

export const parseS3Objects = s3Objects => {
    // year/category/type/order/filename
    const pat = /(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)$/i;
    const archive = {};
    s3Objects.Contents.forEach(object => {
        const match = pat.exec(object.Key) 
        if (match) {
            let [ year, category, type, order, filename ] =
                match.slice(1, 6);
            try {
                year = parseInt(year);
                order = parseInt(order);
            } catch (e) {
                console.error(e);
                return;
            }
            if (!archive[year]) {
                archive[year] = {}
            }
            if (!archive[year][category]) {
                archive[year][category] = {}
            }
            if (!archive[year][category][type]) {
                archive[year][category][type] = {}
            }
            archive[year][category][type][order] = {
                key: object.Key,
                title: filename.split(".")[0]
            }
       }
    })
    return archive;
}