import BD from "../repositories/event_location-repositories.js";

const bd = new BD();

export default class EventLocationService {
    async validateEventLocation(eventLocation) {
        if (!eventLocation.name || eventLocation.name.length < 3) {
            return "Name is invalid";
        }
        if (!eventLocation.full_address || eventLocation.full_address.length < 3) {
            return "Full address is invalid";
        }
        if (!eventLocation.id_location) {
            return "Location ID is invalid";
        }
        if (eventLocation.max_capacity <= 0) {
            return "Max capacity is invalid";
        }
        return "";
    }

    async createEventLocation(eventLocation) {
        return bd.qCreteEL(eventLocation);
    }

    async updateEventLocation(eventLocation) {
        const existingLocation = await bd.qUpdateEL(eventLocation.id_creator_user, eventLocation.id);
        if (!existingLocation.length) {
            return false;
        }
        return bd.qUpdateEL(eventLocation);
    }

    async deleteEventLocation(id, id_creator_user) {
        const existingLocation = await bd.qDeleteEL(id_creator_user, id);
        if (!existingLocation.length) {
            return false;
        }
        return bd.qDeleteEL(id, id_creator_user);
    }

    async getEventLocations(user) {
        const evLocation = await bd.qAllEL(user);
        return evLocation.map(row => ({
            id: row.id,
            id_location: row.id_location,
            name: row.name,
            full_address: row.full_address,
            max_capacity: row.max_capacity,
            latitude: row.latitude,
            longitude: row.longitude,
            id_creator_user: row.id_creator_user
        }));
    }

    async getEventLocationById(user, id) {
        const evLocation = await bd.qSerchById(user, id);
        return evLocation.map(row => ({
            id: row.id,
            id_location: row.id_location,
            name: row.name,
            full_address: row.full_address,
            max_capacity: row.max_capacity,
            latitude: row.latitude,
            longitude: row.longitude,
            id_creator_user: row.id_creator_user
        }));
    }
}
