import { useCallback } from 'react';
import * as PDFJS from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const useNuxo = () => {
    //eslint-disable-next-line
    const bookshelf = window.bookshelf;
    const createBoleta = useCallback(
        //eslint-disable-next-line
        async (params) => {
            try{
                const result = await window.createBoleta(params);
                const { path } = await convertPDFToImage( 
                    result.publicPath,
                    `${result.folio}.png`
                );
               const ticket = await bookshelf.tickets.create({
                    data: {
                        folio: result.folio,
                        path: result.publicPath,
                        total: params.amount,
                        preview: path,
                        bill_id: params.billsId
                    }
                });
                return ticket;
            }catch(err){
                console.log(err);
            }
        }, []
    );

    const cancelBoleta = useCallback(
        async ({
            companyRut, 
            total,
            folio,
            ...params
        }) => {
            const eboletaCancel = {
                ...params,
                empOption: companyRut,
                document: {
                    products: [
                        {
                            name: "anulación de boleta",
                            quantity: "1",
                            price: total / 1.19, //Total / 1.19
                        },
                    ]
                },
                reference: folio,
                date: "2021-08-01",
                description: folio,
            };
            const result = await window.cancelBoleta(eboletaCancel);
            return result;
        }, []
    );

    return { createBoleta , cancelBoleta };
};


const convertPDFToImage = async (url,filename) => {
    const pdf  = await PDFJS.getDocument({url}).promise;
    const page = await pdf.getPage(1);

    let viewport = page.getViewport({ scale: 1 });

    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let renderContext = { canvasContext: ctx, viewport };

    canvas.height = viewport.height;
    canvas.width  = viewport.width;

    await page.render(renderContext).promise;

    const dataUrl = canvas.toDataURL();
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
    //await convertDataUrlToFile(dataUrl);
    const path = await window.writeFile({ buffer: base64Data, filename });
    return { path };
};

/*
const convertDataUrlToFile = (dataUrl) => {
    return fetch(dataUrl)
        .then(res => res.arrayBuffer())
        .then( async () => {
            return {};
        });
};*/

export { useNuxo };