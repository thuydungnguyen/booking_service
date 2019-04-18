/**
 * Import express framework
 */
import * as express from 'express';
import * as admin from 'firebase-admin';

import serviceAccount from '../ServiceAccountKey';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

/**
 * Express router usage
 */
const router = express.Router();
const db = admin.firestore();

/**
 * route to check back office service is up
 */
router.get('/hello_back_office_service', (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    response.status(200).send('back office service is on duty!');
});

/**
 * route ADD Hostel
 */
router.post('/hostel', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const hostelObject = {
        name: request.body.name,
        stars: request.body.stars,
        address: request.body.address,
        city: request.body.city,
        phone: request.body.phone
    };

    const firebaseResponse = db.collection('Hostels').doc().set(hostelObject)
        .then((response) => {
            return {haveError: false};
        })
        .catch((error) => {
            return {haveError: true, message: error.message}
        });

    if (!firebaseResponse["haveError"]) {
        response.status(200).send("Hostel added successfully");
    } else {
        response.status(409).send(firebaseResponse["message"]);
    }
});

/**
 * route update hostel
 * */
router.put('/hostel/:hostelId', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const hostelId = request.params.hostelId;
    const newHostelObject = request.body;

    const firebaseResponse = db.collection('Hostels').doc(hostelId).update(newHostelObject)
        .then((response) => {
            return {haveError: false};
        })
        .catch((error) => {
            return {haveError: true, message: error.message}
        });

    if (!firebaseResponse["haveError"]) {
        response.status(200).send(`hostel updated successfully`);
    } else {
        response.status(409).send(firebaseResponse["message"]);
    }
});

/**
 * route delete room
 */
router.delete('/hostel/:hostelId', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const hostelId = request.params.hostelId;

    const firebaseResponse = db.collection('Hostels').doc(hostelId).delete()
        .then((response) => {
            return {haveError: false};
        })
        .catch((error) => {
            return {haveError: true, message: error.message}
        });

    if (!firebaseResponse["haveError"]) {
        response.status(200).send(`Hostel deleted successfully`);
    } else {
        response.status(409).send(firebaseResponse["message"]);
    }
});

/**
 * route ADD room to a specific hostel
 */
router.post('/room', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const hostelId = request.body.hostelId;
    const roomType = request.body.type;

    const newRoomObject = {
        hostel: hostelId,
        type: roomType
    };

    const firebaseResponse = db.collection('Rooms').doc().set(newRoomObject)
        .then((response) => {
            return {haveError: false};
        })
        .catch((error) => {
            return {haveError: true, message: error.message}
        });

    if (!firebaseResponse["haveError"]) {
        response.status(200).send("room added successfully");
    } else {
        response.status(409).send(firebaseResponse["message"]);
    }
});

/**
 * route update room
 * */
router.put('/room/:roomId', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const roomId = request.params.roomId;
    const newRoomObject = request.body;

    const firebaseResponse = db.collection('Rooms').doc(roomId).update(newRoomObject)
        .then((response) => {
            return {haveError: false};
        })
        .catch((error) => {
            return {haveError: true, message: error.message}
        });

    if (!firebaseResponse["haveError"]) {
        response.status(200).send(`room updated successfully`);
    } else {
        response.status(409).send(firebaseResponse["message"]);
    }
});

/**
 * route delete room
 */
router.delete('/room/:hostelId', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const roomId = request.params.roomId;

    const firebaseResponse = db.collection('Rooms').doc(roomId).delete()
        .then((response) => {
            return {haveError: false};
        })
        .catch((error) => {
            return {haveError: true, message: error.message}
        });

    if (!firebaseResponse["haveError"]) {
        response.status(200).send(`room deleted successfully`);
    } else {
        response.status(409).send(firebaseResponse["message"]);
    }
});

/**
 * route ADD room type
 */
router.post('/room-type', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const roomType = request.body.type;
    const roomPrice = request.body.price;
    const roomNbPerson = request.body.nbPerson;

    const newRoomTypeObject = {
        type: roomType,
        price: roomPrice,
        nbPerson: roomNbPerson
    };

    const firebaseResponse = db.collection('Room_Type').doc().set(newRoomTypeObject)
        .then((response) => {
            return {haveError: false};
        })
        .catch((error) => {
            return {haveError: true, message: error.message}
        });

    if (!firebaseResponse["haveError"]) {
        response.status(200).send("room type added successfully");
    } else {
        response.status(409).send(firebaseResponse["message"]);
    }
});

/**
 * route update room type
 * */
router.put('/room-type/:roomTypeId', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const roomTypeId = request.params.roomTypeId;
    const newRoomTypeObject = request.body;

    const firebaseResponse = db.collection('Room_Type').doc(roomTypeId).update(newRoomTypeObject)
        .then((response) => {
            return {haveError: false};
        })
        .catch((error) => {
            return {haveError: true, message: error.message}
        });

    if (!firebaseResponse["haveError"]) {
        response.status(200).send(`room updated successfully`);
    } else {
        response.status(409).send(firebaseResponse["message"]);
    }
});

/**
 * route delete room type
 */
router.delete('/room-type/:roomTypeId', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const roomTypeId = request.params.roomTypeId;

    const firebaseResponse = db.collection('Room_Type').doc(roomTypeId).delete()
        .then((response) => {
            return {haveError: false};
        })
        .catch((error) => {
            return {haveError: true, message: error.message}
        });

    if (!firebaseResponse["haveError"]) {
        response.status(200).send(`room deleted successfully`);
    } else {
        response.status(409).send(firebaseResponse["message"]);
    }
});

/**
 * route add parking
 */
router.post('/parking', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const parkingHostel = request.body.hostelId;
    const parkingPrice = request.body.price;

    const newParkingObject = {
        hostel: parkingHostel,
        price: parkingPrice
    };

    const firebaseResponse = db.collection('Parkings').doc().set(newParkingObject)
        .then((response) => {
            return {haveError: false};
        })
        .catch((error) => {
            return {haveError: true, message: error.message}
        });

    if (!firebaseResponse["haveError"]) {
        response.status(200).send("parking added successfully");
    } else {
        response.status(409).send(firebaseResponse["message"]);
    }
});

/**
 * route update parking
 * */
router.put('/parking/:parkingId', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const parkingId = request.params.parkingId;
    const newParkingObject = request.body;

    const firebaseResponse = db.collection('Parkings').doc(parkingId).update(newParkingObject)
        .then((response) => {
            return {haveError: false};
        })
        .catch((error) => {
            return {haveError: true, message: error.message}
        });

    if (!firebaseResponse["haveError"]) {
        response.status(200).send("parking updated successfully");
    } else {
        response.status(409).send(firebaseResponse["message"]);
    }
});

/**
 * route delete parking
 */
router.delete('/parking/:parkingId', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const parkingId = request.params.parkingId;

    const firebaseResponse = db.collection('Parkings').doc(parkingId).delete()
        .then((response) => {
            return {haveError: false};
        })
        .catch((error) => {
            return {haveError: true, message: error.message}
        });

    if (!firebaseResponse["haveError"]) {
        response.status(200).send("parking deleted successfully");
    } else {
        response.status(409).send(firebaseResponse["message"]);
    }
});

export default router;