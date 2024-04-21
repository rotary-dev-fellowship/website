import fs from 'fs';

function extractCountryCode(phoneNumber) {
  const match = phoneNumber.match(/\+([0-9]+)/);
  return match ? parseInt(match[1], 10) : null;
}

fs.readFile('./.ref/member-contacts.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Failed to read the file:', err);
    return;
  }

  const phoneNumbers = JSON.parse(data);
  const countryCodes = new Set(); // To avoid duplicates

  // Extract country codes from phone numbers
  phoneNumbers.forEach(number => {
    const code = extractCountryCode(number);
    if (code) {
      countryCodes.add(code);
    }
  });

  // Prepare output
  const output = {
    counts: {
      members: phoneNumbers.length,
      countries: countryCodes.size,
    },
    countryCodes: Array.from(countryCodes).sort((a, b) => a - b) // Convertir Set a Array y ordenar
  };

  // Escribir el resultado en un nuevo archivo JSON
  const outFileName = './src/data_files/member-stats.json';
  fs.writeFile(outFileName, JSON.stringify(output, null, 2), err => {
    if (err) {
      console.error('Error writing the file:', err);
    } else {
      console.log('Data written to', outFileName);
    }
  });
});
