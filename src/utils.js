export const getAllCategories = s3Objects => {
    const pat = /.+?\/(.+?)\//i;
    const categories = [];
    s3Objects.Contents.forEach(object => {
        const match = pat.exec(object.Key)
        if (match) {
            categories.push(match[1])
        }
    })
    return categories;
}

export const parseS3Objects = s3Objects => {
    console.log(s3Objects);
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