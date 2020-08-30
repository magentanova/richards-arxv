// export const PATH_PREFIX = "file:///Volumes/RFV/"

// export const PATH_PREFIX = "/"

export const PATH_PREFIX = "https://isa-arxv.s3.amazonaws.com"

export const APP_TITLE = "Los Carballo-Richards Family Theater"

export const APP_SUBTITLE = "[ 2018 - ??? ]"

export const API_ROOT = process.env.NODE_ENV === "development" ? 
    "http://localhost:5000" :
    "https://isa-arxv-api.herokuapp.com";