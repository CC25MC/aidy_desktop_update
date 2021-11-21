import * as PDFJS from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;


const convertPDFToImage = async ({...params}) => {
    const pdf  = await PDFJS.getDocument({
        ...params
    }).promise;
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
    return { image: dataUrl, base64Data };
};

const resizeImage = ({
    image,
    width,
    height
}) => {

    return new Promise( (resolve) => {
        const img =  new Image();
        img.onload = () => {
            const mainCanvas = document.createElement("canvas");
            let finalWidth = width;
            let finalHeight = height;
            if( finalHeight === "auto" ){
                let ratio = parseFloat( img.width ) / parseFloat( img.height );
                finalHeight = finalWidth / ratio;
            }
            mainCanvas.width = finalWidth;
            mainCanvas.height = finalHeight;
            var ctx = mainCanvas.getContext("2d");
            ctx.drawImage(img, 0, 0, mainCanvas.width, mainCanvas.height);
                const result = mainCanvas.toDataURL();
                const base64Data = result.replace(/^data:image\/png;base64,/, "");
                resolve({ image: result, base64Data });
            } 
            img.src = image;
    })
}

export { convertPDFToImage, resizeImage };