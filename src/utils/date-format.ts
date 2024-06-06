const formatDate = (dateString: any) => {
    const options: any = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
};

export default formatDate;