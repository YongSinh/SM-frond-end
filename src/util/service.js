import dayjs from "dayjs"


export const isEmptyOrNull = (value) => {
    if(value == "" || value == null || value == 'null' || value == undefined){
        return true;
    }
    return false;
}

export const formatDateForClient = (date) => {
    if(!isEmptyOrNull(date)){
        return dayjs(date).format("DD/MM/YYYY")
    }
    return null
}

export const formatDateForServer = (date) => {
    if(!isEmptyOrNull(date)){
        return dayjs(date).format("YYYY-MM-DD")
    }
    return null
}

// export const parseToInt

