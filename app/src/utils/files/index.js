import * as XLSX from 'xlsx';

function mergeArrayObjects(arr1,arr2){
    const set = new Set([ ...arr1.map( d => d.id ), ...arr2.map( d => d.id ) ])
    return Array.from(set, (id) => {
        let left = arr1.find( a => a.id === id );
        let right = arr2.find( a => a.id === id );
        return { ...( left || {} ) , ...( right || {} ) }
    })
}

const parseExcelData = ( data , keyMap ) => {
    return data.map( d => {
        let realData = {}
        const keys = Object.keys(d);
        for( const key of keys ){
            let realDataKey = keyMap[ key.toLowerCase() ] || 
                Object.values(keyMap).find( value => value === key.toLowerCase() );
            if( realDataKey ){
                realData = { ...realData, [ realDataKey ]: d[key] }
            }
        }
        return realData;
    });   
}

const readExcelFile = file => {
    return new Promise( resolve => {
        const reader = new FileReader();
        reader.onload = (evt) => {
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, {type:'binary'});
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws);
            /* Update state */
            resolve(data);
        };
        reader.readAsBinaryString(file);
    });
}

export { parseExcelData, mergeArrayObjects, readExcelFile };