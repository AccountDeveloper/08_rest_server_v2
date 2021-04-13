const { OAuth2Client } = require('google-auth-library');

const client_id = process.env.CLIENT_ID;
const client = new OAuth2Client(client_id);

const googleVerify = async(id_token = '') => {
    const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: client_id,
    });
    const {
        name: nombre,
        picture: img,
        email: correo
    } = ticket.getPayload();

    return { nombre, img, correo };
}
module.exports = {
    googleVerify
}