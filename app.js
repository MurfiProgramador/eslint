const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['Bien entes de comunicarle con un asesor porfavor brindame sus datos *DNI*, *NOMBRES* Y *DIRECCION*; espere un momento, ahora le comunico con un asesor humano 👨‍💻 espero haberle ayudado 🤖'])

const flowInfo = addKeyword(['Informacion','link','web','1'])
.addAnswer('Bien ahora le envio el link de nuestra pagina web', {
    media:'https://i.imgur.com/rtEJ35t.jpg'
})
.addAnswer(
    [
        '👨‍💻👇 Aquí encontras todos nuestros productos y servicios ',
        '*https://siscamchaccha-sistemas-de-segurida.webnode.page/*',
        '\n*2* CONTACTAR CON UN ASESOR 👨‍💻 o volver al menu principal escribir *hola* , *volver* , *atras*.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowProduc = addKeyword(['productos','ventas','catalogo','2'])
    .addAnswer('🙌 Aquí encontras nuestros *SISTEMAS DE VIGILANCIA*', {
        media:'https://i.imgur.com/7wAK3p2.jpg'
    })
    .addAnswer('🙌 Aquí encontras nuestros *SISTEMAS ALARMAS*', {
        media:'https://i.imgur.com/8WdM6jE.jpg'
    })
    .addAnswer('🙌 Aquí encontras nuestros *SISTEMAS DE CONTROL DE ACCESO*', {
        media:'https://i.imgur.com/rhwdEIf.jpg'
    })
    .addAnswer('🙌 Aquí encontras nuestros *SISTEMAS DE TELECOMUNICACIONES*', {
        media:'https://i.imgur.com/dkGT4Uk.jpg'
    })
    .addAnswer('🙌 Aquí encontras nuestros *SISTEMAS DE REDES Y CABLEADO ESTRUCTURADO*', {
        media:'https://i.imgur.com/EyZlHLb.jpg'
    })
    .addAnswer('🙌 Aquí encontras nuestros *SISTEMAS CONTRA INCENDIOS*', {
        media:'https://i.imgur.com/0KU1CQv.jpg'
    })
    .addAnswer(
       [    
           'le adjunte imagenes con las marcas que trabajamos de igual forma los tipos de sistemas que trabajamos y que brindamos garantia',
           '\n*2* CONTACTAR CON UN ASESOR 👨‍💻o volver al menu principal escribir *hola* , *volver* , *atras*.',
      ],
    null,
    null,
    [flowSecundario]
)

const flowInsta = addKeyword(['instalacion','instalar','3']).addAnswer(
    [
        '👷 la instalacion dependera de la altura que se ubicara la camara y tambien la distancia que estara entre en dvr/nvr y la camara',
        '[mas de 15 mts] S/60.00 soles por camara (*precio aprox.*)',
        '[mas de 25 mts] S/80.00 soles por camara (*precio aprox.*)',
        '[de 50 a 80 mts] S/100.00 soles por camara (*precio aprox.*)',
        'los precios mencionados solo son de mano de obra mas no de accesorios de instalacion',
        '\n*2* CONTACTAR CON UN ASESOR 👨‍💻o volver al menu principal escribir *hola* , *volver* , *atras*.',
    ],
    null,
    null,
    [flowSecundario]
)
const flowGra = addKeyword(['gracias','listo','ok','vale','chau']).addAnswer(['Espero haberle ayudado, tenga un buen dia  *RECUERDA QUE ESTAMOS PARA AYUDARLE Y BRINDARLE LOS SERVICIOS DE CALIDAD PARA EL CUIDADO DE UD Y SU FAMILIA*🤝'], {
    media:'https://i.imgur.com/rtEJ35t.jpg'
})
const flowMante = addKeyword(['mante','mantenimiento','4','Mantenimiento']).addAnswer(
    ['🛠️🔧 Bien si esta interesado en realizar un mantenimiento a sus sistemas de seguridad tiene que  ser cada 4 meses como maximo para tener un buen cuidado de sus dispositivos ', 
    '\n*2* CONTACTAR CON UN ASESOR 👨‍💻o volver al menu principal escribir *hola* , *volver* , *atras* .'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola','ole','alo','volver','volver','atras'])
    .addAnswer('🙌 Hola Bienvenido, Soy *YHASEB* el *Chatbot* 🤖 de *SISCAMCHACCHA* estare para apoyarlo🤝', {
        media:'https://i.imgur.com/WTXaDCk.jpg'
    })
    .addAnswer(
        [
            'En esta oportunidad le ayudare con su compra y le brindare informacion de nuestros servicios; Dime cual desea??👇.',
            '👨‍💻 *Informacion.   1️⃣*  Para enviarle el link de pagina y revise nuestros productos y servicios.',
            '🛒 *Productos.     2️⃣*   Para ver la lista de productos y marcas que trabajamos.',
            '👷 *Instalacion.   3️⃣*  Conocer precios de instalacion. (los precios son aprox)',
            '🛠️ *Mantenimiento. 4️⃣*  Registrar un mantenimiento o consultar.',
        ],
        null,
        null,
        [flowInfo, flowProduc, flowInsta, flowMante]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowGra])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
