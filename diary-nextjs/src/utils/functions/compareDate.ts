export function compareDate(entryDate: string) {
    console.log(new Date().toDateString(), entryDate);
    return new Date().toDateString() === entryDate;
}
