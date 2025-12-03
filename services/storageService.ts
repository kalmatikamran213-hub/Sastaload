export const STORAGE_KEYS = {
    CONTACT: 'sastaload_contact_submissions',
    DRIVERS: 'sastaload_driver_registrations',
    BUSINESS: 'sastaload_business_leads',
    WAITLIST: 'sastaload_waitlist',
    USERS: 'sastaload_user_signups',
};

export const saveSubmission = (key: string, data: any) => {
    try {
        const existingData = JSON.parse(localStorage.getItem(key) || '[]');
        const newEntry = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            ...data
        };
        existingData.unshift(newEntry); // Add to top
        localStorage.setItem(key, JSON.stringify(existingData));
        return true;
    } catch (error) {
        console.error("Error saving submission", error);
        return false;
    }
};

export const getSubmissions = (key: string) => {
    try {
        return JSON.parse(localStorage.getItem(key) || '[]');
    } catch (error) {
        return [];
    }
};

export const deleteSubmission = (key: string, id: string) => {
    try {
        const existingData = JSON.parse(localStorage.getItem(key) || '[]');
        const newData = existingData.filter((item: any) => item.id !== id);
        localStorage.setItem(key, JSON.stringify(newData));
        return true;
    } catch (error) {
        console.error("Error deleting submission", error);
        return false;
    }
};

export const clearSubmissions = (key: string) => {
    localStorage.removeItem(key);
};