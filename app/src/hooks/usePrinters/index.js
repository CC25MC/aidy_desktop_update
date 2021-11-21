import { useQuery } from "react-query";
import { useCallback, useMemo, useState } from "react";
import { Printer } from "utils/printer";

const printerKey = "__AIDY_PRINTER__";
const paperKey = "__AIDY_PAPER__";

const usePrinters = () => {
    return useQuery(
        "printers",
        () => {
            return Printer.obtenerImpresoras();
        }, {
            initialData: [],
            refetchInterval: false,
            refetchIntervalInBackground: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false
        }
    );
};

const useDefaultPrinter = () => {
    const [ defaultPrinter, setDefaultPrinter ] = useState(
        localStorage.getItem(printerKey)
    );
    
    const paperOptions = [ 
        { id: "1" , paperId: 1,  measure: "58mm" , width: 219.2125 } , 
        { id: "11", paperId: 2,  measure: "80mm" , width: 302.3622 }  
    ];

    const [ paper, setPaper ] = useState(
        JSON.parse( localStorage.getItem(paperKey) ) ?? {}
    );

    const selectPrinter = useCallback(
        (printerName) => {
            localStorage.setItem(printerKey, printerName);
            setDefaultPrinter(printerName);
        }, [setDefaultPrinter]
    );

    const updatePaper = useCallback(
        (paper) => {
            if(paper.measure === "58mm" || paper.measure === "80mm"){
                setPaper(paper);
                localStorage.setItem(paperKey, JSON.stringify(paper) );
            }
        }, [setPaper]
    );

    const printFromLocal = useCallback(
        async (url) => {
            const PrinterClient = new Printer();
            PrinterClient.imagenLocal(url);
            PrinterClient.cortar();
            PrinterClient.cortarParcialmente();
            PrinterClient.imprimirEn(defaultPrinter);
        } , [defaultPrinter]
    );

    const printFromUrl = useCallback(
        async (url) => {
            const PrinterClient = new Printer();
            PrinterClient.imagenDesdeUrl(url);
            PrinterClient.cortar();
            PrinterClient.cortarParcialmente();
            PrinterClient.imprimirEn(defaultPrinter);
        } , [defaultPrinter]
    );

    const value = useMemo( () => ({
        printer: defaultPrinter,
        printFromUrl,
        selectPrinter,
        printFromLocal,
        updatePaper,
        paper,
        paperOptions
    }) , [ defaultPrinter, printFromLocal,updatePaper,paper, printFromUrl ]);

    return value;
};

export { usePrinters, useDefaultPrinter };