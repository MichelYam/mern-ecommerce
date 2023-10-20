const keys = {
    app: {
        name: 'Mern Ecommerce',
        apiURL: `${process.env.BASE_API_URL}`,
        clientURL: process.env.CLIENT_URL
    },
    port: process.env.PORT || 3000,
    database: {
        url: process.env.MONGO_URI
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        tokenLife: '7d'
    },
    nodemailer: {
        // key: process.env.NODEMAILER_KEY,
        // domain: process.env.NODEMAILER_DOMAIN,
        sender: process.env.NODEMAILER_EMAIL_SENDER,
        password: process.env.NODEMAILER_PASSWORD_SENDER
    },
};

export default keys