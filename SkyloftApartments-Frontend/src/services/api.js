// src/services/api.js
const API_BASE_URL = 'http://localhost:5019/api'; // Use HTTP and port 5019

export const apartmentService = {
    getApartments: async () => {
        try {
            console.log('Fetching from:', `${API_BASE_URL}/apartments`);
            const response = await fetch(`${API_BASE_URL}/apartments`);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch apartments: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Apartments data received:', data);
            return data;
        } catch (error) {
            console.error('Error fetching apartments:', error);
            throw error;
        }
    },

    getApartment: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/apartments/${id}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch apartment: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching apartment:', error);
            throw error;
        }
    }
};

// Update other services too
export const bookingService = {
    createBooking: async (bookingData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });
            
            if (!response.ok) {
                throw new Error(`Failed to create booking: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating booking:', error);
            throw error;
        }
    }
};

export const guestService = {
    createGuest: async (guestData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/guests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(guestData),
            });
            
            if (!response.ok) {
                throw new Error(`Failed to create guest: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating guest:', error);
            throw error;
        }
    }
};