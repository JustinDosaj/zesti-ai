

export async function getCurrentDate() {

    const now: Date = new Date();
    const month: string = (now.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
    const day: string = now.getDate().toString().padStart(2, '0');
    const year: string = now.getFullYear().toString().slice(-2);
    const formatDate: string = `${month}/${day}/${year}`

    return formatDate
}