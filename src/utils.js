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