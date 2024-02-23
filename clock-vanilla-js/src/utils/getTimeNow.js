function getTimeNow() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();

    return [hours, minutes, seconds, milliseconds]
}

export {getTimeNow}