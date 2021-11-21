import { Box, Text, Flex, Modal, Card, Set, Icon, useToasts } from 'bumbag';
import { Button, PrinterIcon } from 'components/atoms';
import { useConnected } from 'hooks';
import { ResumenCheckout } from '../ListCheckout';
import { Scrollbars } from 'react-custom-scrollbars';
import { Total } from 'utils';
import { useAsync, useNuxo } from 'hooks';
import { useHistory } from 'react-router';
import { useAuth, useValidateKey } from 'hooks/useClient';
import { useDefaultPrinter } from 'hooks/usePrinters';
import BoletPdf from './BoletPdf';
import { PDFViewer, usePDF } from '@react-pdf/renderer';
import { useBillsId } from 'hooks/models';
import { convertPDFToImage, resizeImage, getWhatsappMessageUrl, getMessageText } from 'utils';
import { useSaveDocument } from 'hooks/useClient';
import FileSaver from 'file-saver';
import { isGuestKey } from '../../../AuthProvider';
import { ShareButton } from '../../molecules';

const LeftContent = ({ invoice, emptyList }) => {
    const checkoutList = invoice.checkoutList;
    const { createBoleta } = useNuxo();
    const { run, isLoading, data: ticket } = useAsync();
    const { mutateAsync: validateKey } = useValidateKey();
    const { billsId } = useBillsId();
    const { user, setUser } = useAuth();
    const { connected, addList } = useConnected();
    const [PDFInstance] = usePDF({ document: BoletPdf({ invoice, user }) })
    const modal = Modal.useState();
    const history = useHistory();
    const toasts = useToasts();
    const { paper, printFromLocal } = useDefaultPrinter();
    const { mutateAsync : saveDocument, isLoading : isSavingDocument } = useSaveDocument();
    return (
        <Box width="100%" height="100%" >
            <Modal {...modal} style={{
                minWidth: 460
            }} >
                <Card
                    title="Aun no puedes generar boletas"
                    footer={(
                        <Set>
                            <Button palette="primary" onClick = {() => {
                                localStorage.removeItem(isGuestKey);
                                setUser({...user, isGuest: false});
                                if(user.isGuest){
                                    history.push("/");
                                }else {
                                    history.push("/settings");
                                }
                            }}>
                                {user.isGuest ? "Ir a registro" : "Ir a ajustes"}
                            </Button>
                            <Button variant="ghost" onClick={() => {
                                modal.hide();
                            }}>
                                Cancelar
                            </Button>
                        </Set>
                    )}
                    headerAddon={
                        <Modal.Disclosure {...modal} use={Button.Close}>Close</Modal.Disclosure>
                    }
                >
                    <Text>
                        Debes configurar tus datos
                        en el menu de ajustes
                        para poder generar boletas
                        {user.key ? `
                            Debes configurar tus datos 
                            en el menu de ajustes
                            para poder generar boletas 
                        `: !user.isGuest
                            ?`No tienes una licensia para usar AIDY, 
                            configura una en el menu de ajustes`
                            :`Debes estar registrado en AIDY para poder generar boletas`
                        }
                    </Text>
                </Card>
            </Modal>
            <Box position="relative">
                <Text fontSize={"400"} color="white">
                    Orden ha sido generada
                </Text>
            </Box>
            <Box>
                <Text fontSize={"400"} color="secondary">
                    {ticket && (`# ${ticket?.folio}`)}
                </Text>
            </Box>
            <Box marginTop="20px" width="100%" height="45%">
                <Box width="100%" minWidth = "530px" alignX={"left"} alignY="bottom" padding="10px" backgroundColor="white" >
                    {ticket ? (
                        <Box style={{
                            backgroundRepeat: 'no-repeat',
                            backgroundImage: `url('${ticket?.preview?.replace(/\\/g, "/")}')`,
                            width: "100%",
                            backgroundPosition: "center",
                            backgroundAttachment: "absolute",
                            backgroundSize: "300px 400px",
                            height: "100vh",
                        }} />
                    ) : (
                        <Box alignX={"center"} alignY="center"  width="100%" height="400px">
                            <PDFViewer style={{ width: "500px", height: "100%", overflowX: 'hidden' }}>
                                <BoletPdf invoice={invoice} user={user} />
                            </PDFViewer>
                        </Box>
                    )}
                    <Flex width="100%">
                        <ShareButton client = {invoice.client} billsId = {billsId} />
                        <Box onClick={async () => {
                            if(!paper && !paper.width ){
                                toasts.warning({
                                    title: "Configuracion faltante",
                                    message: "Aun no has configurado un papel para imprimir, dirigete a ajustes y elige un tipo de papel"
                                });
                                return;
                            }
                            if (ticket) {
                                const { base64Data } = await resizeImage({
                                    image: ticket.preview,
                                    width: paper.width * 2,
                                    height: "auto"
                                });
                                const filepath = await window.writeFile({
                                    buffer: base64Data,
                                    filename: `temp-${billsId}`,
                                    saveIn: "temp"
                                });
                                printFromLocal(filepath);
                            }else {
                                if(!PDFInstance.isLoading){
                                    const blob = PDFInstance.blob;
                                    blob.arrayBuffer().then(async buffer => {
                                        try {
                                            const data = new Uint8Array(buffer);
                                            const { image } = await convertPDFToImage({
                                                data
                                            });
                                            const { base64Data } = await resizeImage({
                                                image,
                                                width: paper.width * 2,
                                                height: "auto"
                                            });
                                            const filepath = await window.writeFile({
                                                buffer: base64Data,
                                                filename: `temp-${billsId}`,
                                                saveIn: "temp"
                                            });
                                            printFromLocal(filepath);
                                        }catch(err){
                                            console.log(err);
                                        }
                                    });
                                }
                            }
                        }} alignX={"center"} alignY="center" marginLeft="10px" borderRadius={"2"} width={"42px"} height="42px" backgroundColor="btn" cursor={connected ? "pointer" : "not-allowed"} >
                            <PrinterIcon size="large" color="#2E6FD3" />
                        </Box>
                        <Box onClick={() => {
                            if (ticket) {
                                window.openExternal(ticket.path);
                            }else if( !PDFInstance.loading ) {
                                FileSaver.saveAs(PDFInstance.url,`BOLETA-AIDY-${billsId}`);
                            }
                        }} alignX={"center"} alignY="center" marginLeft="10px" borderRadius={"2"} width={"42px"} height="42px" backgroundColor="btn" cursor={connected ? "pointer" : "not-allowed"} >
                            <Icon icon={"download"} fontSize="400" color="#2E6FD3" />
                        </Box>
                        <Box marginLeft="auto" alignX={"center"} width={"auto"} alignY="center">
                            <Text fontSize={"100"} color="primary">
                                {ticket ? "Boleta Obtenida del SII" : "Esta es una factura generada por AIDY"}
                            </Text>
                        </Box>
                    </Flex>
                </Box>
            </Box>
            <Box marginTop="20px" width="100%" alignX={"center"} >
                <Box width="50%">
                    {!connected &&
                        <Box width={"100%"} borderRadius="2" backgroundColor="#F7E894" >
                            <Flex padding="5px">
                                <Box width="10%" alignY="center" alignX="center">
                                    <Icon icon="warning" color="#997400" />
                                </Box>
                                <Box width="90%" alignY="center" alignX="center">
                                    <Text fontSize="100" color="#997400">
                                        En estos momentos tu dispositivo no esta conectado a internet por lo tanto no podemos generar tu boleta.
                                    </Text>
                                </Box>

                            </Flex>
                        </Box>}
                    {!ticket && (
                        <Button
                            width={"100%"}
                            fontWeight="normal"
                            marginTop="20px"
                            palette={"white"}
                            disabled={!connected}
                            isLoading={isLoading}
                            onClick={() => {
                                let currentUser = user;
                                if (currentUser && currentUser.rut && currentUser.passwordEboleta && currentUser.key) {
                                    const params = {
                                        user: currentUser.rut,
                                        password: currentUser.passwordEboleta,
                                        amount: Total(invoice.checkoutList),
                                        rut: currentUser.rut,
                                        certificatePassword: currentUser.certificate || "",
                                        empOption: "",
                                        billsId: billsId
                                    };
                                    validateKey({ code: currentUser.key, id: currentUser.id }).then(validation => {
                                        if (validation.isValid) {
                                            run(createBoleta(params));
                                        } else {
                                            toasts.danger({
                                                title: 'Licencia invalida',
                                                message: 'Tu licencia ha expirado o fue revocada por favor dirigete al menu de ajustes y verifica nuevamente tu Key'
                                            });
                                        }
                                    });
                                } else {
                                    modal.show();
                                }
                            }}
                        >
                            Generar Boleta
                        </Button>
                    )}
                    {!!(invoice.client && invoice.client.whatsapp) && (
                        <Button
                            iconBefore={"ws"}
                            fontWeight="normal"
                            width={"100%"}
                            marginTop="20px"
                            palette={"ws"}
                            color="white"
                            disabled={isLoading || isSavingDocument }
                            _hover={{ backgroundColor: 'white', color: 'black' }}
                            onClick = {() => {
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
                            }}
                        >
                            { isSavingDocument ? "Estamos enviando tu mensaje" : "Enviar por whatsapp" }
                        </Button>
                    )}
                    <Button
                        width={"100%"}
                        fontWeight="normal"
                        palette={"transparent"}
                        color="white"
                        marginTop="20px"
                        disabled={isLoading}
                        onClick={() => {
                            if (!connected) {
                                addList(invoice.checkoutList);
                            }
                            emptyList();
                            setTimeout(function () {
                                history.push("/pos");
                            }, 1000);

                        }}
                    >
                        Realiza otra venta
                    </Button>

                </Box>
            </Box>
            <Box marginTop="20px">
                <Text fontSize={"200"} color="white">
                    Gracias por usar Aidy Lite
                </Text>
            </Box>
        </Box>
    );
};

const RightContent = ({ invoice }) => {
    return (
        <>
            <Flex width="100%" >
                <Box width="100px">
                    <Text fontSize={"100"} color="white">
                        Items
                    </Text>
                </Box>
                <Box width="200px" marginLeft="100px">
                    <Text fontSize={"100"} color="white">
                        Método de pago
                    </Text>
                </Box>
                <Box width="200px" marginLeft="100px">
                    <Text fontSize={"100"} color="white">
                        Cliente
                    </Text>
                </Box>
            </Flex>
            <Flex width="100%">
                <Box width="100px">
                    <Text fontSize={"300"} color="white">
                        {invoice.checkoutList.length}
                    </Text>
                </Box>
                <Box width="200px" marginLeft="100px">
                    <Text fontSize={"300"} color="white">
                        {invoice.payMethods}
                    </Text>
                </Box>
                <Box width="200px" marginLeft="100px">
                    <Text fontSize={"300"} color="white">
                        {invoice.client?.name} {invoice.client?.lastname}
                    </Text>
                </Box>
            </Flex>
            <Box width="100%" height="2px" marginTop="20px" backgroundColor="secondary" />
            <Scrollbars style={{ height: "350px", marginTop: "10px", }}>
                {invoice.checkoutList.map((item, key) => (<ResumenCheckout key={key} item={item} />))}
            </Scrollbars>
            <Box width="100%" height="60px" borderRadius="2" padding="10px" backgroundColor="secondary" >
                <Flex width="100%">
                    <Box alignX={"center"} alignY="center">
                        <Text fontSize={"300"} fontWeight="semibold" color="black">
                            Descuento: % 
                        </Text>
                    </Box>
                    <Box alignX={"center"} alignY="center">
                        <Text fontSize={"300"} fontWeight="semibold" color="black">
                            {invoice?.discount || 0}
                        </Text>
                    </Box>
                    <Box alignX={"center"} alignY="center"  marginLeft="auto">
                        <Text fontSize={"300"} fontWeight="semibold" color="black">
                            Total: $
                        </Text>
                    </Box>
                    <Box alignX={"center"} alignY="center">
                        <Text fontSize={"300"} fontWeight="semibold" color="black">
                            {invoice?.total}
                        </Text>
                    </Box>
                </Flex>
            </Box>
        </>
    );
};
export const Invoice = ({ emptyList, invoice }) => {
    return (
        <Flex height={"100%"}>
            <Box width="50%" height="100%" padding="25px 40px 25px 40px" backgroundColor="primary">
                <LeftContent invoice={invoice} emptyList={emptyList} />
            </Box>
            <Box width="50%" height="100%" padding="110px 40px 25px 40px" backgroundColor="#09234B">
                <RightContent invoice={invoice} />
            </Box>
        </Flex>
    );
};