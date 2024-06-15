

const convertDurationToReadable = (isoDuration: string) => { 
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
    const matches = isoDuration.match(regex);
  
    // Extract the parts from the regex matches
    const hours = matches && matches[1] ? parseInt(matches[1], 10) : 0;
    const minutes = matches && matches[2] ? parseInt(matches[2], 10) : 0;
  
    // Create a readable format
    let result = '';
    if (hours) result += `${hours}h`;
    if (minutes) result += `${minutes}m`;
  
    return result.trim();
}

export default convertDurationToReadable;