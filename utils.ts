export const exportToCsv = (filename: string, data: any[]) => {
    if (!data || data.length === 0) {
        alert('No data to export.');
        return;
    }

    const headers = Object.keys(data[0]);
    const csvRows = [
        headers.join(','),
        ...data.map(row => 
            headers.map(header => {
                let cell = row[header] === null || row[header] === undefined ? '' : row[header];
                if (typeof cell === 'object') {
                    cell = JSON.stringify(cell).replace(/"/g, '""');
                } else {
                    cell = String(cell).replace(/"/g, '""');
                }
                // Enclose in quotes if it contains a comma, double quote, or newline
                if (/[",\n]/.test(cell)) {
                    cell = `"${cell}"`;
                }
                return cell;
            }).join(',')
        )
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
