import moment from 'moment'

export const formatDate =(utcDate) => {
    return moment(utcDate).format('L à HH:mm')
}