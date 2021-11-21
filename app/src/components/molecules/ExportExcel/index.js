import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportExcel = ({ data, button, keys, name, filename }) => {
    const columns = parsedKeys(keys);
    return (
        <ExcelFile element = {button} filename = {filename || name}>
            <ExcelSheet data={data} name={name} >
                {columns.map( (col,id) => (
                    <ExcelColumn key = {`col-${name}-${id}`} label = {col.label} value = {col.value} />
                ))}
            </ExcelSheet>
        </ExcelFile>
    )
}

const parsedKeys = (keys) => {
    return Object.entries(keys).map( ([ key , value ]) => {
        const label = typeof value === "object"
            ? value.label
            : value;
        const colValue = typeof value === "object"
            ? value.value
            : key;
        return ({
            label,
            value: colValue
        })
    });
}

export { ExportExcel };