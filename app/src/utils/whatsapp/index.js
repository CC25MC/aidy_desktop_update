import { Total as getTotalOrder } from "../Total";
const whatsappUrl = "https://api.whatsapp.com/send?";

const getWhatsappMessageUrl = ({
    to,
    text,
    code = 58
}) => {
    let phone = to;

    if( phone.startsWith("+") ){
        phone = phone.substr(1);
    }

    if( phone.startsWith("0") ){
        phone = code + phone.substr(1);
    }

    const textEncode = `text=${encodeURI(text)}`;
    const toParam = `phone=${phone}`;
    const resultUrl = `${whatsappUrl}${[textEncode,toParam].join("&")}`;
    console.log({resultUrl});
    return resultUrl;
}

const getMessageText = ({ checkoutList , url, name }) => {
    const text = `*Hola ${name}! Gracias por tu compra*

Resumen de tu orden:

${checkoutList.map( (item,index) => `${item.name}: ${item.quantity} × $${item.price} ${ index >= checkoutList.length ? "" : "\n" }`)}
------------------------------------------
total: *$${getTotalOrder(checkoutList)}*

puedes ver tu factura abriendo este enlace: ${window.baseUrl}${url}


este mensaje fue generado usando *Aidy Lite!* https://aidy.cl/
`

    return text;

}

export { getWhatsappMessageUrl, getMessageText };