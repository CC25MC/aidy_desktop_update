import { Box, Modal, Card, Button, Menu, useToasts } from 'bumbag';
import { ShareIcon } from 'components/atoms';
import { getWhatsappMessageUrl, getMessageText } from 'utils';
import { Fragment } from 'react';
import { useSaveDocument } from 'hooks/useClient';

const ShareButton = ({ client, billsId }) => {
    const modal = Modal.useState();
    const toasts = useToasts();
    const { mutateAsync : saveDocument } = useSaveDocument();
    if(!client && !client?.whatsapp){
        return null;
    }

    return(
        <Fragment>
            <Box onClick = {() => {
                modal.show();
            }} alignX={"center"} alignY="center" borderRadius={"2"} width={"42px"} height="42px" backgroundColor="btn" >
                <ShareIcon size="large" color="#2E6FD3" />
            </Box>
            <Modal {...modal} style={{
                minWidth: 460
            }}>
                <Card
                    title="Compartir"
                    headerAddon={
                        <Modal.Disclosure {...modal} use={Button.Close}/>
                    }
                >
                    <Box height="360px">
                        <Menu>
                            <Menu.Item iconBefore="ws" onClick = {() => {
                                if( ticket ) {
                                    var reader  = new FileReader();
                                    reader.onloadend = function () {
                                        const buffer = reader.result;
                                        const blob = new Blob( buffer , { type: "application/pdf" });
                                        const file = new File( [blob] , "ticket-eboleta.pdf", { type: "application/pdf" } );
                                        saveDocument({
                                            file,
                                            type: "BOLETA-ONLINE"
                                        }).then(
                                            (result) => {
                                                const client = invoice.client;
                                                window.openExternal(getWhatsappMessageUrl({
                                                    to: client.whatsapp,
                                                    text: getMessageText({ 
                                                        checkoutList, 
                                                        url: result.file.url,
                                                        name: client.name
                                                    })
                                                }));

                                                toasts.success({
                                                    title: "Mensaje enviado",
                                                    message: "Si no se abrio tu navegador revisa la aplicacion de whatsapp dekstop"
                                                });

                                                const bookshelf = window.bookshelf;
                                                bookshelf.tickets.update({
                                                    where: {
                                                        id: ticket.id
                                                    },
                                                    data: {
                                                        online_preview_url: result.file.url
                                                    }
                                                })
                                            }
                                        )
                                    }
                                    reader.readAsArrayBuffer();
                                }else {
                                    const billId = Array.isArray(billsId) ? billsId[ billsId.length -  1 ] : billsId;                                
                                    saveDocument({
                                        file: new File([PDFInstance.blob], "ticket.pdf", {
                                            type: "application/pdf"
                                        }),
                                        type: "BOLETA-OFFLINE"
                                    }).then(
                                        (result) => {
                                            const client = invoice.client;
                                            window.openExternal(getWhatsappMessageUrl({
                                                to: client.whatsapp,
                                                text: getMessageText({
                                                    checkoutList,
                                                    url: result.file.url,
                                                    name: client.name
                                                })
                                            }));

                                            toasts.success({
                                                title: "Mensaje enviado",
                                                message: "Si no se abrio tu navegador revisa la aplicacion de whatsapp dekstop"
                                            });

                                            const bookshelf = window.bookshelf;
                                            bookshelf.bills.update({
                                                where: {
                                                    id: billId
                                                },
                                                data: {
                                                    online_preview_url: result.file.url
                                                }
                                            })
                                        }
                                    )
                                }


                            }}>
                                Compartir por whatsapp
                            </Menu.Item>
                        </Menu>
                    </Box>
                </Card>
            </Modal>
        </Fragment>
    )
}

export { ShareButton }