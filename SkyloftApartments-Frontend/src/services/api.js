// src/services/api.js
const API_BASE_URL = 'http://localhost:5019/api';

export const apartmentService = {
    getApartments: async () => {
        const response = await fetch(`${API_BASE_URL}/apartments`);
        if (!response.ok) throw new Error('Failed to fetch apartments');
        return await response.json();
    },

    getApartment: async (id) => {
        const response = await fetch(`${API_BASE_URL}/apartments/${id}`);
        if (!response.ok) throw new Error('Failed to fetch apartment');
        return await response.json();
    },

    checkAvailability: async (apartmentId, checkIn, checkOut) => {
        const response = await fetch(
            `${API_BASE_URL}/bookings/availability?apartmentId=${apartmentId}&checkIn=${checkIn}&checkOut=${checkOut}`
        );
        if (!response.ok) throw new Error('Failed to check availability');
        return await response.json();
    }
};

export const bookingService = {
    getBookings: async () => {
        const response = await fetch(`${API_BASE_URL}/bookings`);
        if (!response.ok) throw new Error('Failed to fetch bookings');
        return await response.json();
    },

    getBooking: async (id) => {
        const response = await fetch(`${API_BASE_URL}/bookings/${id}`);
        if (!response.ok) throw new Error('Failed to fetch booking');
        return await response.json();
    },

    createBooking: async (bookingData) => {
        const response = await fetch(`${API_BASE_URL}/bookings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        });
        if (!response.ok) throw new Error('Failed to create booking');
        return await response.json();
    },

    updateBooking: async (id, bookingData) => {
        const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        });
        if (!response.ok) throw new Error('Failed to update booking');
        return await response.json();
    },

    deleteBooking: async (id) => {
        const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete booking');
        return await response.json();
    }
};

export const guestService = {
    getGuests: async () => {
        const response = await fetch(`${API_BASE_URL}/guests`);
        if (!response.ok) throw new Error('Failed to fetch guests');
        return await response.json();
    },

    getGuest: async (id) => {
        const response = await fetch(`${API_BASE_URL}/guests/${id}`);
        if (!response.ok) throw new Error('Failed to fetch guest');
        return await response.json();
    },

    createGuest: async (guestData) => {
        const response = await fetch(`${API_BASE_URL}/guests`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(guestData)
        });
        if (!response.ok) throw new Error('Failed to create guest');
        return await response.json();
    },

    updateGuest: async (id, guestData) => {
        const response = await fetch(`${API_BASE_URL}/guests/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(guestData)
        });
        if (!response.ok) throw new Error('Failed to update guest');
        return await response.json();
    }
};

export const contactService = {
    submitContact: async (contactData) => {
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contactData)
        });
        if (!response.ok) throw new Error('Failed to submit contact form');
        return await response.json();
    },

    getContactSubmissions: async () => {
        const response = await fetch(`${API_BASE_URL}/contact`);
        if (!response.ok) throw new Error('Failed to fetch contact submissions');
        return await response.json();
    }
};

export const availabilityService = {
    getAvailability: async (startDate, endDate) => {
        const response = await fetch(
            `${API_BASE_URL}/availability?startDate=${startDate}&endDate=${endDate}`
        );
        if (!response.ok) throw new Error('Failed to fetch availability');
        return await response.json();
    }
};