export const API_ENDPOINT = "https://ajax.test-danit.com/api/v2/cards";

class Visit {
    constructor(doctor, purpose, description, urgency, name) {
        this.doctor = doctor;
        this.purpose = purpose;
        this.description = description;
        this.urgency = urgency;
        this.name = name;
    }

    create() {
        const data = {
            doctor: this.doctor,
            purpose: this.purpose,
            description: this.description,
            urgency: this.urgency,
            name: this.name,
        };

        return fetch(API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .catch((error) => console.error("Error creating visit:", error));
    }
}

export class VisitDentist extends Visit {
    constructor(doctor, purpose, description, urgency, name, lastVisitDate) {
        super(doctor, purpose, description, urgency, name);
        this.lastVisitDate = lastVisitDate;
    }

    create() {
        const data = {
            ...super.create(),
            lastVisitDate: this.lastVisitDate,
        };

        return fetch(API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .catch((error) => console.error("Error creating dentist visit:", error));
    }
}

export class VisitCardiologist extends Visit {
    constructor(doctor, purpose, description, urgency, name, pressure, bmi, heartDiseases, age) {
        super(doctor, purpose, description, urgency, name);
        this.pressure = pressure;
        this.bmi = bmi;
        this.heartDiseases = heartDiseases;
        this.age = age;
    }

    create() {
        const data = {
            ...super.create(),
            pressure: this.pressure,
            bmi: this.bmi,
            heartDiseases: this.heartDiseases,
            age: this.age,
        };

        return fetch(API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .catch((error) => console.error("Error creating cardiologist visit:", error));
    }
}

export class VisitTherapist extends Visit {
    constructor(doctor, purpose, description, urgency, name, age) {
        super(doctor, purpose, description, urgency, name);
        this.age = age;
    }

    create() {
        const data = {
            ...super.create(),
            age: this.age,
        };

        return fetch(API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .catch((error) => console.error("Error creating therapist visit:", error));
    }
}