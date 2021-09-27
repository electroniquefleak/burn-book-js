function dateFormat(date) {
    return new Date(date).toDateString() + ", at " + new Date(date).toLocaleTimeString();;
}