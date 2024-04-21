// Format the date to a string
export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric'};

  return new Date(date).toLocaleDateString(undefined, options);
}

// Capitalize the first letter
export function capitalize(str:string): string {
  if ( typeof str !== 'string' || str.length === 0 ) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function randomizeArray(array: any[]): any[] {
  const newArray = [...array];
  return newArray.sort(() => Math.random() - 0.5);
}
